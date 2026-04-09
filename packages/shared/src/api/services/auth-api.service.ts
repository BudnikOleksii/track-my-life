import type {
  AuthControllerExchangeSocialCodeResponse,
  AuthControllerLoginResponse,
  AuthControllerLogoutResponse,
  AuthControllerRefreshTokenResponse,
  AuthControllerRegisterResponse,
  ExchangeSocialCodeDto,
  LoginDto,
  RegisterDto,
  RevokeRefreshTokenDto,
} from '../generated/types.gen';

import { ApiClient } from '../client/api-client';

export class AuthApiService extends ApiClient {
  private BASE_URL = '/api/auth' as const;
  private ENDPOINTS = {
    REGISTER: `${this.BASE_URL}/register`,
    LOGIN: `${this.BASE_URL}/login`,
    REFRESH_TOKEN: `${this.BASE_URL}/refresh-token`,
    LOGOUT: `${this.BASE_URL}/logout`,
    REVOKE_REFRESH_TOKEN: `${this.BASE_URL}/revoke-refresh-token`,
    REVOKE_REFRESH_TOKENS: `${this.BASE_URL}/revoke-refresh-tokens`,
    EXCHANGE_SOCIAL_CODE: `${this.BASE_URL}/social/exchange`,
  } as const;

  register(body: RegisterDto) {
    return this.request<AuthControllerRegisterResponse>({
      method: 'POST',
      url: this.ENDPOINTS.REGISTER,
      body,
      credentials: 'include',
    });
  }

  login(body: LoginDto) {
    return this.request<AuthControllerLoginResponse>({
      method: 'POST',
      url: this.ENDPOINTS.LOGIN,
      body,
      credentials: 'include',
    });
  }

  refreshToken() {
    return this.request<AuthControllerRefreshTokenResponse>({
      method: 'POST',
      url: this.ENDPOINTS.REFRESH_TOKEN,
      credentials: 'include',
    });
  }

  logout() {
    return this.request<AuthControllerLogoutResponse>({
      method: 'POST',
      url: this.ENDPOINTS.LOGOUT,
      credentials: 'include',
    });
  }

  revokeRefreshToken(body: RevokeRefreshTokenDto) {
    return this.request<void>({
      method: 'POST',
      url: this.ENDPOINTS.REVOKE_REFRESH_TOKEN,
      body,
    });
  }

  revokeAllRefreshTokens() {
    return this.request<void>({
      method: 'POST',
      url: this.ENDPOINTS.REVOKE_REFRESH_TOKENS,
    });
  }

  exchangeSocialCode(body: ExchangeSocialCodeDto) {
    return this.request<AuthControllerExchangeSocialCodeResponse>({
      method: 'POST',
      url: this.ENDPOINTS.EXCHANGE_SOCIAL_CODE,
      body,
      credentials: 'include',
    });
  }
}
