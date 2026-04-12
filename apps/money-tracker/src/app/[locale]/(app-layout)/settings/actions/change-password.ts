'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';
import type { ChangePasswordDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { profileApiService } from '@track-my-life/next-shared/src/api/server-api';

import { redirectUnauthorized } from '@/actions/redirect-unauthorized';
import { checkRateLimit } from '@/utils/rate-limit';

import { changePasswordFormSchema } from '../constants/change-password-form-schema';

export const changePassword = async (
  input: ChangePasswordDto,
): Promise<ServerActionResult<true>> => {
  await redirectUnauthorized();

  if (!(await checkRateLimit('changePassword'))) {
    return { ok: false, error: 'rateLimited' };
  }

  const validated = changePasswordFormSchema.safeParse(input);

  if (!validated.success) {
    return { ok: false, error: 'validationFailed' };
  }

  const { error } = await profileApiService.changePassword(validated.data);

  if (error) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  return { ok: true, data: true };
};
