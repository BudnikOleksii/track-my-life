import type { ProfileResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscProfileApiService } from '@track-my-life/shared/src/api/rsc-api';

export const fetchProfile = async (): Promise<ProfileResponseDto | null> => {
  const { data, error } = await rscProfileApiService.fetchProfile();

  if (error) {
    return null;
  }

  return data ?? null;
};
