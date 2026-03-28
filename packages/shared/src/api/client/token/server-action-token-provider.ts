import type { ReadWriteTokenProvider } from './types';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export class ServerActionTokenProvider implements ReadWriteTokenProvider {
  async getAccessToken(): Promise<string | null> {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  }

  async getRefreshToken(): Promise<string | null> {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null;
  }

  async setTokenPair(accessToken: string, refreshToken: string): Promise<void> {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, TOKEN_COOKIE_OPTIONS);
    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, TOKEN_COOKIE_OPTIONS);
  }

  async clearTokenPair(): Promise<void> {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
  }
}
