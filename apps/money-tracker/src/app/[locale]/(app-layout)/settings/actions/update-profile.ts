'use server';

import type { UpdateProfileDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { profileApiService } from '@track-my-life/next-shared/src/api/server-api';
import { revalidatePath, updateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

import { profileFormSchema } from '../constants/profile-form-schema';

export const updateProfile = async (input: UpdateProfileDto) => {
  await requireAuth();

  const validated = profileFormSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await profileApiService.updateProfile(validated.data as UpdateProfileDto);

  if (error) {
    return null;
  }

  updateTag(CACHE_TAG.PROFILE);
  revalidatePath(PATHS.settings);

  return data;
};
