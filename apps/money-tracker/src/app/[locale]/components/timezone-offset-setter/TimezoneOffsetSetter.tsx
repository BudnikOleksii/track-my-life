'use client';

import { useEffect } from 'react';

import { COOKIE } from '@/constants/cookie';

const COOKIE_MAX_AGE_DAYS = 365;
const SECONDS_PER_DAY = 86_400;

export const TimezoneOffsetSetter = () => {
  useEffect(() => {
    const offset = new Date().getTimezoneOffset();
    const maxAge = COOKIE_MAX_AGE_DAYS * SECONDS_PER_DAY;
    document.cookie = `${COOKIE.TIMEZONE_OFFSET}=${String(offset)};path=/;max-age=${String(maxAge)};SameSite=Lax`;
  }, []);

  return null;
};
