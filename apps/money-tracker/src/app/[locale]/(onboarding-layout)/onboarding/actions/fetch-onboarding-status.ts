import { rscOnboardingApiService } from '@track-my-life/next-shared/src/api/rsc-api';

export const fetchOnboardingStatus = async () => {
  const { data, error } = await rscOnboardingApiService.fetchStatus();

  if (error || !data) {
    return null;
  }

  return data;
};
