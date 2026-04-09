'use server';

import type { CompleteOnboardingDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { onboardingApiService } from '@track-my-life/next-shared/src/api/server-api';
import { redirect } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';

import { requireAuth } from '@/actions/require-auth';
import { COOKIE } from '@/constants/cookie';
import { PATHS } from '@/constants/paths';

export const completeOnboarding = async (input: CompleteOnboardingDto) => {
  await requireAuth();
  const locale = await getLocale();

  const { error } = await onboardingApiService.complete(input);

  if (error) {
    return { error: 'completeFailed' };
  }

  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    if (cookie.name.startsWith(COOKIE.ONBOARDING_STATUS)) {
      cookieStore.delete(cookie.name);
    }
  });

  redirect({ href: PATHS.dashboard, locale });
  return { error: null };
};
