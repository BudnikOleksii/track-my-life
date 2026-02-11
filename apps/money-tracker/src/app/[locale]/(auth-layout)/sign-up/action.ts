'use server';

import { redirect } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { signUpWithEmailAndPassword } from '@track-my-life/shared/src/supabase/server';
import { getLocale } from 'next-intl/server';

import type { SignUpError } from '@/app/[locale]/(auth-layout)/sign-up/constants';

import { MIN_PASSWORD_LENGTH } from '@/app/[locale]/(auth-layout)/constants/min-password-length';
import { SIGN_UP_ERROR } from '@/app/[locale]/(auth-layout)/sign-up/constants';
import { getFormFieldValue } from '@/app/[locale]/(auth-layout)/utils/get-form-field-value';
import { ROUTES } from '@/constants/routes';

const redirectWithError = (error: SignUpError, locale: string) => {
  redirect({ href: `${ROUTES.signIn}?error=${error}`, locale });
};

export const signUp = async (formData: FormData) => {
  const email = getFormFieldValue(formData, 'email');
  const password = getFormFieldValue(formData, 'password');
  const locale = await getLocale();

  if (!email || !password || password.length < MIN_PASSWORD_LENGTH) {
    redirectWithError(SIGN_UP_ERROR.validation, locale);
  }

  const { error } = await signUpWithEmailAndPassword(email, password);

  if (error) {
    redirectWithError(SIGN_UP_ERROR.generic, locale);
  }

  redirect({ href: ROUTES.verifyEmail, locale });
};
