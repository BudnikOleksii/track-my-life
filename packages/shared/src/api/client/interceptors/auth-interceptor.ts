import type { AuthResponseDto } from '../../generated/types.gen';
import type { ApiClient } from '../api-client';
import type { ReadOnlyTokenProvider, ReadWriteTokenProvider } from '../token/types';

import { HTTP_STATUS_CODE } from '../../../constants/http-status-code';
import { checkIsReadWriteTokenProvider } from '../token/types';

interface AuthInterceptorConfig {
  tokenProvider: ReadOnlyTokenProvider | ReadWriteTokenProvider;
  refreshUrl: string;
  getRequestCookieHeader?: () => string | null | Promise<string | null>;
}

const fetchRefreshedToken = async (
  refreshUrl: string,
  cookieHeader: string | null,
): Promise<AuthResponseDto | null> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (cookieHeader) {
    headers['Cookie'] = cookieHeader;
  }

  const refreshResponse = await fetch(refreshUrl, {
    method: 'POST',
    headers,
    credentials: 'include',
  });

  if (!refreshResponse.ok) {
    return null;
  }

  return refreshResponse.json() as Promise<AuthResponseDto>;
};

const retryWithNewToken = (request: Request, accessToken: string): Promise<Response> => {
  const retryRequest = new Request(request, {
    headers: new Headers(request.headers),
  });
  retryRequest.headers.set('Authorization', `Bearer ${accessToken}`);

  return fetch(retryRequest);
};

export class AuthInterceptor {
  private refreshPromise: Promise<AuthResponseDto | null> | null = null;
  private tokenProvider: ReadOnlyTokenProvider | ReadWriteTokenProvider;
  private refreshUrl: string;
  private getRequestCookieHeader: (() => string | null | Promise<string | null>) | undefined;

  constructor(config: AuthInterceptorConfig) {
    this.tokenProvider = config.tokenProvider;
    this.refreshUrl = config.refreshUrl;
    this.getRequestCookieHeader = config.getRequestCookieHeader;
  }

  setupOn(client: ApiClient): void {
    client.addRequestInterceptor(this.handleRequest);
    client.addResponseInterceptor(this.handleResponse);
  }

  private handleRequest = async (request: Request): Promise<Request> => {
    const accessToken = await this.tokenProvider.getAccessToken();

    if (accessToken) {
      const authenticatedRequest = new Request(request, {
        headers: new Headers(request.headers),
      });
      authenticatedRequest.headers.set('Authorization', `Bearer ${accessToken}`);
      return authenticatedRequest;
    }

    return request;
  };

  private handleResponse = async (response: Response, request: Request): Promise<Response> => {
    if (response.status !== HTTP_STATUS_CODE.UNAUTHORIZED) {
      return response;
    }

    if (!checkIsReadWriteTokenProvider(this.tokenProvider)) {
      return response;
    }

    if (this.refreshPromise) {
      return this.waitForPendingRefresh(response, request);
    }

    return this.initiateTokenRefresh(response, request);
  };

  private waitForPendingRefresh = async (
    fallbackResponse: Response,
    request: Request,
  ): Promise<Response> => {
    const tokenData = await this.refreshPromise;

    return tokenData ? retryWithNewToken(request, tokenData.accessToken) : fallbackResponse;
  };

  private initiateTokenRefresh = async (
    fallbackResponse: Response,
    request: Request,
  ): Promise<Response> => {
    const cookieHeader = (await this.getRequestCookieHeader?.()) ?? null;
    this.refreshPromise = fetchRefreshedToken(this.refreshUrl, cookieHeader);

    try {
      return await this.processRefreshResult(fallbackResponse, request);
    } catch {
      if (checkIsReadWriteTokenProvider(this.tokenProvider)) {
        await this.tokenProvider.clearAccessToken();
      }
      return fallbackResponse;
    } finally {
      this.refreshPromise = null;
    }
  };

  private processRefreshResult = async (
    fallbackResponse: Response,
    request: Request,
  ): Promise<Response> => {
    const tokenData = await this.refreshPromise;

    if (!tokenData) {
      if (checkIsReadWriteTokenProvider(this.tokenProvider)) {
        await this.tokenProvider.clearAccessToken();
      }
      return fallbackResponse;
    }

    if (checkIsReadWriteTokenProvider(this.tokenProvider)) {
      await this.tokenProvider.setAccessToken(tokenData.accessToken);
    }

    return retryWithNewToken(request, tokenData.accessToken);
  };
}
