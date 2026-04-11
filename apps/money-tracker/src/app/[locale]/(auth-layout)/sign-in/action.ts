'use server';

import { authApiService } from '@track-my-life/next-shared/src/api/server-api';

import type { AuthAction } from '@/app/[locale]/(auth-layout)/types/auth-action';

import { authFormSchema } from '@/app/[locale]/(auth-layout)/constants/auth-form-schema';
import { completeAuth } from '@/app/[locale]/(auth-layout)/utils/complete-auth';
import { PATHS } from '@/constants/paths';
import { checkRateLimit } from '@/utils/rate-limit';

export const signIn: AuthAction = async (credentials) => {
  if (!(await checkRateLimit('signIn'))) {
    return { errors: [{ message: 'rateLimited' }] };
  }

  const validatedFields = authFormSchema.safeParse(credentials);

  if (!validatedFields.success) {
    return { errors: validatedFields.error.issues };
  }

  const { data, error, response } = await authApiService.login(validatedFields.data);

  if (error || !data) {
    return { errors: [{ message: 'generic' }] };
  }

  await completeAuth(response, data.accessToken, PATHS.dashboard);
  return null;
};
