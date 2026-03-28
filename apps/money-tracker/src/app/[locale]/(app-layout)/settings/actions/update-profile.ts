'use server';

import type { UpdateProfileDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { profileApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath } from 'next/cache';

import { PATHS } from '@/constants/paths';

import { profileFormSchema } from '../constants/profile-form-schema';

export const updateProfile = async (input: UpdateProfileDto) => {
  const validated = profileFormSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await profileApiService.updateProfile(validated.data as UpdateProfileDto);

  if (error) {
    return null;
  }

  revalidatePath(PATHS.settings);
  return data;
};
