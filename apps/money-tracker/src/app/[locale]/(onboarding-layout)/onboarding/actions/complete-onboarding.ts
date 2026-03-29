'use server';

import { profileApiService } from '@track-my-life/shared/src/api/server-api';
import { cookies } from 'next/headers';

const ONBOARDING_COMPLETED_COOKIE_PREFIX = 'onboarding_completed';

export const completeOnboarding = async () => {
  const { data, error } = await profileApiService.updateProfile({ onboardingCompleted: true });

  if (error) {
    return null;
  }

  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    if (cookie.name.startsWith(ONBOARDING_COMPLETED_COOKIE_PREFIX)) {
      cookieStore.delete(cookie.name);
    }
  });

  return data;
};
