'use server';

import {
  authApiService,
  serverActionTokenProvider,
} from '@track-my-life/shared/src/api/server-api';
import { redirect } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { getLocale } from 'next-intl/server';

import { PATHS } from '@/constants/paths';

export const signOut = async () => {
  try {
    const refreshToken = await serverActionTokenProvider.getRefreshToken();
    if (refreshToken) {
      await authApiService.logout({ refreshToken });
    }
  } catch {
    // Sign-out failed server-side, still redirect to sign-in
  }

  await serverActionTokenProvider.clearTokenPair();

  const locale = await getLocale();
  redirect({ href: PATHS.signIn, locale });
};
