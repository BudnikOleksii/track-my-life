import type { ReadOnlyTokenProvider } from './types';

import { ACCESS_TOKEN_COOKIE } from '../../../constants/cookie';

export class RscTokenProvider implements ReadOnlyTokenProvider {
  async getAccessToken(): Promise<string | null> {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  }
}
