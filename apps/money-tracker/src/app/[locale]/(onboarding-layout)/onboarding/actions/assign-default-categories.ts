'use server';

import { onboardingApiService } from '@track-my-life/next-shared/src/api/server-api';
import { updateTag } from 'next/cache';

import { redirectUnauthorized } from '@/actions/redirect-unauthorized';
import { CACHE_TAG } from '@/constants/cache-tag';

export const assignDefaultCategories = async () => {
  await redirectUnauthorized();

  const { error } = await onboardingApiService.assignDefaultCategories();

  if (error) {
    return { error: 'assignFailed' };
  }

  updateTag(CACHE_TAG.CATEGORIES);

  return { error: null };
};
