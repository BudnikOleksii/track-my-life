'use server';

import { redirect } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { signOutServer } from '@track-my-life/shared/src/supabase/auth/sign-out';
import { getLocale } from 'next-intl/server';

import { PATHS } from '@/constants/paths';

export const signOut = async () => {
  try {
    await signOutServer();
  } catch {
    // Sign-out failed server-side, still redirect to sign-in
    // TODO: add error tracking
  }

  const locale = await getLocale();
  redirect({ href: PATHS.signIn, locale });
};
