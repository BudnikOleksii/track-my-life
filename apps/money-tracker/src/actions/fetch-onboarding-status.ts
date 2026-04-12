import type { OnboardingStatusResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscOnboardingApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { cache } from 'react';

import { ONBOARDING_CACHE } from '@/constants/cache-tag';

export const fetchOnboardingStatus = cache(
  async (): Promise<OnboardingStatusResponseDto | null> => {
    const { data, error } = await rscOnboardingApiService.fetchStatus(ONBOARDING_CACHE);

    if (error || !data) {
      return null;
    }

    return data;
  },
);
