'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';

import { categoryApiService } from '@track-my-life/next-shared/src/api/server-api';
import { updateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { entityIdSchema } from '@/constants/entity-id-schema';

export const deleteCategory = async (id: string): Promise<ServerActionResult<true>> => {
  await requireAuth();

  if (!entityIdSchema.safeParse(id).success) {
    return { ok: false, error: 'validationFailed' };
  }

  const { error } = await categoryApiService.deleteCategory(id);

  if (error) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  updateTag(CACHE_TAG.CATEGORIES);

  return { ok: true, data: true };
};
