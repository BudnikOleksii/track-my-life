'use server';

import { forwardResponseCookieList } from '@track-my-life/shared/src/api/client/token/forward-response-cookie-list';
import {
  authApiService,
  serverActionTokenProvider,
} from '@track-my-life/shared/src/api/server-api';
import { redirect } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { getLocale } from 'next-intl/server';

import type { AuthAction } from '@/app/[locale]/(auth-layout)/types/auth-action';

import { authFormSchema } from '@/app/[locale]/(auth-layout)/constants/auth-form-schema';
import { PATHS } from '@/constants/paths';

export const signUp: AuthAction = async (credentials) => {
  const locale = await getLocale();
  const validatedFields = authFormSchema.safeParse(credentials);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues,
    };
  }

  const { data, error, response } = await authApiService.register(validatedFields.data);

  if (error || !data) {
    return {
      errors: [{ message: 'generic' }],
    };
  }

  await Promise.all([
    forwardResponseCookieList(response),
    serverActionTokenProvider.setAccessToken(data.accessToken),
  ]);

  redirect({ href: PATHS.verifyEmail, locale });
  return null;
};
