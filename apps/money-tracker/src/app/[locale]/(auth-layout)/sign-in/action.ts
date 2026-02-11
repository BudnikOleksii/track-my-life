'use server';

import { signInWithEmailAndPassword } from '@track-my-life/shared/src/supabase/server';
import { getLocale } from 'next-intl/server';

import { ROUTES } from '@/constants/routes';

import type { LoginError } from './constants';

import { redirect } from '../../../../../../../packages/shared/src/i18n/navigation/navigation';
import { MIN_PASSWORD_LENGTH } from '../constants/min-password-length';
import { getFormFieldValue } from '../utils/get-form-field-value';
import { LOGIN_ERROR } from './constants';

const redirectWithError = (error: LoginError, locale: string) => {
  redirect({ href: `${ROUTES.signIn}?error=${error}`, locale });
};

export const signIn = async (formData: FormData) => {
  const email = getFormFieldValue(formData, 'email');
  const password = getFormFieldValue(formData, 'password');
  const locale = await getLocale();

  if (!email || !password || password.length < MIN_PASSWORD_LENGTH) {
    redirectWithError(LOGIN_ERROR.validation, locale);
  }

  const { error } = await signInWithEmailAndPassword(email, password);

  if (error) {
    redirectWithError(LOGIN_ERROR.credentials, locale);
  }

  redirect({ href: ROUTES.dashboard, locale });
};
