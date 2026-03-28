'use server';

import { profileApiService } from '@track-my-life/shared/src/api/server-api';
import { cookies } from 'next/headers';

const ONBOARDING_COMPLETED_COOKIE = 'onboarding_completed';

export const completeOnboarding = async () => {
  const { data, error } = await profileApiService.updateProfile({ onboardingCompleted: true });

  if (error) {
    return null;
  }

  const cookieStore = await cookies();
  cookieStore.set(ONBOARDING_COMPLETED_COOKIE, 'true', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  });

  return data;
};
