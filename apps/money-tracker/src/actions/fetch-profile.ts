import type { ProfileResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscProfileApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { cache } from 'react';

import { CACHE_TAG } from '@/constants/cache-tag';

const PROFILE_CACHE = { revalidate: 86_400, tags: [CACHE_TAG.PROFILE] } as const;

export const fetchProfile = cache(async (): Promise<ProfileResponseDto | null> => {
  const { data, error } = await rscProfileApiService.fetchProfile(PROFILE_CACHE);

  if (error) {
    return null;
  }

  return data ?? null;
});
