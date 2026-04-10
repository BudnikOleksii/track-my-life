'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';
import type {
  ProfileResponseDto,
  UpdateProfileDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { profileApiService } from '@track-my-life/next-shared/src/api/server-api';
import { revalidatePath, updateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

import { profileFormSchema } from '../constants/profile-form-schema';

export const updateProfile = async (
  input: UpdateProfileDto,
): Promise<ServerActionResult<ProfileResponseDto>> => {
  await requireAuth();

  const validated = profileFormSchema.safeParse(input);

  if (!validated.success) {
    return { ok: false, error: 'validationFailed' };
  }

  const { data, error } = await profileApiService.updateProfile(validated.data as UpdateProfileDto);

  if (error || !data) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  updateTag(CACHE_TAG.PROFILE);
  revalidatePath(PATHS.settings);

  return { ok: true, data };
};
