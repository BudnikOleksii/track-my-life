import type {
  AuthControllerLoginResponse,
  AuthControllerLogoutResponse,
  AuthControllerRefreshTokenResponse,
  AuthControllerRegisterResponse,
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
}
