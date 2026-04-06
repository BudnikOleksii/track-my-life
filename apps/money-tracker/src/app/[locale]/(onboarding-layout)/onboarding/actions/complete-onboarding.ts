'use server';

import { profileApiService } from '@track-my-life/shared/src/api/server-api';
import { cookies } from 'next/headers';

import { requireAuth } from '@/actions/require-auth';
import { COOKIE } from '@/constants/cookie';

export const completeOnboarding = async () => {
  await requireAuth();

  const { data, error } = await profileApiService.updateProfile({ onboardingCompleted: true });

  if (error) {
    return null;
  }

  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    if (cookie.name.startsWith(COOKIE.ONBOARDING_COMPLETED)) {
      cookieStore.delete(cookie.name);
    }
  });

  return data;
};
