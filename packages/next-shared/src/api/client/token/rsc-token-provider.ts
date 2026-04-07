import type { ReadOnlyTokenProvider } from '@track-my-life/shared/src/api/client/token/types';

import { ACCESS_TOKEN_COOKIE } from '@track-my-life/shared/src/constants/cookie';

export class RscTokenProvider implements ReadOnlyTokenProvider {
  async getAccessToken(): Promise<string | null> {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  }
}
