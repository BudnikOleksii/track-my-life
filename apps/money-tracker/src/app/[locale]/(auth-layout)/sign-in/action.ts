'use server';

import { redirect } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { signInWithEmailAndPassword } from '@track-my-life/shared/src/supabase/auth/sign-in';
import { getLocale } from 'next-intl/server';

import type { AuthAction } from '@/app/[locale]/(auth-layout)/types/auth-action';

import { authFormSchema } from '@/app/[locale]/(auth-layout)/constants/auth-form-schema';
import { PATHS } from '@/constants/paths';

export const signIn: AuthAction = async (credentials) => {
  const locale = await getLocale();
  const validatedFields = authFormSchema.safeParse(credentials);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues,
    };
  }

  const { error } = await signInWithEmailAndPassword(validatedFields.data);

  if (error) {
    return {
      errors: [{ message: 'generic' }],
    };
  }

  redirect({ href: PATHS.dashboard, locale });
  return null;
};
