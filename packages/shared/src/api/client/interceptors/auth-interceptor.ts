import type { AuthResponseDto } from '../../generated/types.gen';
import type { ApiClient } from '../api-client';
import type { TokenProvider } from '../token/types';

import { HTTP_STATUS_CODE } from '../../../constants/http-status-code';

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
  private isRefreshing = false;

  constructor(
    private tokenProvider: TokenProvider,
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
    if (response.status !== HTTP_STATUS_CODE.UNAUTHORIZED || this.isRefreshing) {
      return response;
    }

    const refreshToken = await this.tokenProvider.getRefreshToken();

    if (!refreshToken) {
      return response;
    }

    this.isRefreshing = true;

    try {
      return await this.attemptTokenRefresh(response, request, refreshToken);
    } finally {
      this.isRefreshing = false;
    }
  };

  private attemptTokenRefresh = async (
    originalResponse: Response,
    request: Request,
    refreshToken: string,
  ): Promise<Response> => {
    try {
      const tokenData = await fetchRefreshedToken(this.refreshUrl, refreshToken);

      if (!tokenData) {
        await this.tokenProvider.clearTokenPair();
        return originalResponse;
      }

      await this.tokenProvider.setTokenPair(tokenData.accessToken, tokenData.refreshToken);

      return retryWithNewToken(request, tokenData.accessToken);
    } catch {
      await this.tokenProvider.clearTokenPair();
      return originalResponse;
    }
  };
}
