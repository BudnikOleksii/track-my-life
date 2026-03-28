import type { AuthResponseDto } from '../../generated/types.gen';
import type { ApiClient } from '../api-client';
import type { ReadOnlyTokenProvider, ReadWriteTokenProvider } from '../token/types';

import { HTTP_STATUS_CODE } from '../../../constants/http-status-code';
import { checkIsReadWriteTokenProvider } from '../token/types';

const fetchRefreshedToken = async (
  refreshUrl: string,
  refreshToken: string,
): Promise<AuthResponseDto | null> => {
  const refreshResponse = await fetch(refreshUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
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

  constructor(
    private tokenProvider: ReadOnlyTokenProvider | ReadWriteTokenProvider,
    private refreshUrl: string,
  ) {}

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
    const refreshToken = await this.tokenProvider.getRefreshToken();

    if (!refreshToken) {
      return fallbackResponse;
    }

    this.refreshPromise = fetchRefreshedToken(this.refreshUrl, refreshToken);

    try {
      return await this.processRefreshResult(fallbackResponse, request);
    } catch {
      if (checkIsReadWriteTokenProvider(this.tokenProvider)) {
        await this.tokenProvider.clearTokenPair();
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
        await this.tokenProvider.clearTokenPair();
      }
      return fallbackResponse;
    }

    if (checkIsReadWriteTokenProvider(this.tokenProvider)) {
      await this.tokenProvider.setTokenPair(tokenData.accessToken, tokenData.refreshToken);
    }

    return retryWithNewToken(request, tokenData.accessToken);
  };
}
