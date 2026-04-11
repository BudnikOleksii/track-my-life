import { cookies } from 'next/headers';
import { cache } from 'react';

import { COOKIE } from '@/constants/cookie';

const DEFAULT_OFFSET = 0;

export const getTimezoneOffset = cache(async (): Promise<number> => {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE.TIMEZONE_OFFSET)?.value;

  if (!value) {
    return DEFAULT_OFFSET;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : DEFAULT_OFFSET;
});
