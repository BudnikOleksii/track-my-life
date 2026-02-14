'use server';

import { redirect } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { signInWithEmailAndPassword } from '@track-my-life/shared/src/supabase/server';
import { getLocale } from 'next-intl/server';

import type { AuthAction } from '@/app/[locale]/(auth-layout)/types/auth-action';

import { authFormSchema } from '@/app/[locale]/(auth-layout)/constants/auth-form-schema';
import { ROUTES } from '@/constants/routes';

export const signIn: AuthAction = async ({ email, password }) => {
  const locale = await getLocale();
  const validatedFields = authFormSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues,
    };
  }

  const { error } = await signInWithEmailAndPassword(email, password);

  if (error) {
    return {
      errors: [{ message: 'generic' }],
    };
  }

  redirect({ href: ROUTES.dashboard, locale });
  return null;
};
