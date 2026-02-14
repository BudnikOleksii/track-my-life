import type { User } from '@supabase/supabase-js';

import { getLocale } from 'next-intl/server';

import { redirect } from '../../i18n/navigation/navigation';
import { createSupabaseServerClient } from '../server';

export const getAuthenticatedUserOrRedirect = async (redirectPath: string) => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    const locale = await getLocale();
    redirect({ href: redirectPath, locale });
  }

  return user as User;
};
