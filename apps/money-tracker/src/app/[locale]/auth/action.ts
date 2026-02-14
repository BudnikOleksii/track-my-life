'use server';

import { redirect } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { signOutServer } from '@track-my-life/shared/src/supabase/server';
import { getLocale } from 'next-intl/server';

import { ROUTES } from '@/constants/routes';

export const signOut = async () => {
  await signOutServer();
  const locale = await getLocale();
  redirect({ href: ROUTES.signIn, locale });
};
