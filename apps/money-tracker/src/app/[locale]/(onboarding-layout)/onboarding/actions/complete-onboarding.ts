'use server';

import type { CompleteOnboardingDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { onboardingApiService } from '@track-my-life/next-shared/src/api/server-api';
import { redirect } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { getLocale } from 'next-intl/server';
import { updateTag } from 'next/cache';

import { redirectUnauthorized } from '@/actions/redirect-unauthorized';
import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

export const completeOnboarding = async (input: CompleteOnboardingDto) => {
  await redirectUnauthorized();
  const locale = await getLocale();

  const { error } = await onboardingApiService.complete(input);

  if (error) {
    return { error: 'completeFailed' };
  }

  updateTag(CACHE_TAG.ONBOARDING);
  redirect({ href: PATHS.dashboard, locale });
  return { error: null };
};
