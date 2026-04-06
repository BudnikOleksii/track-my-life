'use server';

import type { UpdateProfileDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { profileApiService } from '@track-my-life/shared/src/api/server-api';

import { requireAuth } from '@/actions/require-auth';

import { profileFormSchema } from '../../../(app-layout)/settings/constants/profile-form-schema';

export const updateOnboardingProfile = async (input: UpdateProfileDto) => {
  await requireAuth();

  const validated = profileFormSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await profileApiService.updateProfile(validated.data as UpdateProfileDto);

  if (error) {
    return null;
  }

  return data;
};
