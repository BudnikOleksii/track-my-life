import type { NextRequest, NextResponse } from 'next/server';

import type { ReadWriteTokenProvider } from './types';

import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_COOKIE_OPTIONS } from '../../../constants/cookie';

export class MiddlewareTokenProvider implements ReadWriteTokenProvider {
  constructor(
    private request: NextRequest,
    private response: NextResponse,
  ) {}

  getAccessToken(): string | null {
    return this.request.cookies.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  }

  getRequestCookieHeader(): string | null {
    return this.request.headers.get('cookie');
  }

  setAccessToken(accessToken: string): void {
    this.response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
  }

  clearAccessToken(): void {
    this.response.cookies.delete(ACCESS_TOKEN_COOKIE);
  }
}
