import type { ReadWriteTokenProvider } from './types';

import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_COOKIE_OPTIONS } from '../../../constants/cookie';

export class ServerActionTokenProvider implements ReadWriteTokenProvider {
  async getAccessToken(): Promise<string | null> {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  }

  async setAccessToken(accessToken: string): Promise<void> {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
  }

  async clearAccessToken(): Promise<void> {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
  }
}
