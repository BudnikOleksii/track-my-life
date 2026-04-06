'use server';

import type { ChangePasswordDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { profileApiService } from '@track-my-life/shared/src/api/server-api';

import { requireAuth } from '@/actions/require-auth';

import { changePasswordFormSchema } from '../constants/change-password-form-schema';

export const changePassword = async (input: ChangePasswordDto) => {
  await requireAuth();

  const validated = changePasswordFormSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await profileApiService.changePassword(validated.data);

  if (error) {
    return null;
  }

  return data;
};
