import type { TokenProvider } from './types';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

export class RscTokenProvider implements TokenProvider {
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

  async setTokenPair(): Promise<void> {}

  async clearTokenPair(): Promise<void> {}
}
