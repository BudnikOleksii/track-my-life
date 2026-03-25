import type { NextRequest, NextResponse } from 'next/server';

import type { TokenProvider } from './types';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export class MiddlewareTokenProvider implements TokenProvider {
  constructor(
    private request: NextRequest,
    private response: NextResponse,
  ) {}

  getAccessToken(): string | null {
    return this.request.cookies.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  }

  getRefreshToken(): string | null {
    return this.request.cookies.get(REFRESH_TOKEN_COOKIE)?.value ?? null;
  }

  setTokenPair(accessToken: string, refreshToken: string): void {
    this.response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, TOKEN_COOKIE_OPTIONS);
    this.response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, TOKEN_COOKIE_OPTIONS);
  }

  clearTokenPair(): void {
    this.response.cookies.delete(ACCESS_TOKEN_COOKIE);
    this.response.cookies.delete(REFRESH_TOKEN_COOKIE);
  }
}
