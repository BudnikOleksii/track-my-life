import { redirect } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { getLocale } from 'next-intl/server';
import { cache } from 'react';

import { PATHS } from '@/constants/paths';

import { fetchOnboardingStatus } from './fetch-onboarding-status';

export const redirectIfNotOnboarded = cache(async () => {
  const [status, locale] = await Promise.all([fetchOnboardingStatus(), getLocale()]);

  if (status && !status.emailVerified) {
    redirect({ href: PATHS.verifyEmail, locale });
  }

  if (status && !status.onboardingCompleted) {
    redirect({ href: PATHS.onboarding, locale });
  }
});
