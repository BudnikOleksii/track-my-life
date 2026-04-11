import type { ProfileResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscProfileApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { cache } from 'react';

import { PROFILE_CACHE } from '@/constants/cache-tag';

export const fetchProfile = cache(async (): Promise<ProfileResponseDto | null> => {
  const { data, error } = await rscProfileApiService.fetchProfile(PROFILE_CACHE);

  if (error) {
    return null;
  }

  return data ?? null;
});
