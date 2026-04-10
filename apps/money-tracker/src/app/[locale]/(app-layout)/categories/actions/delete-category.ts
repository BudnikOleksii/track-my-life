'use server';

import { categoryApiService } from '@track-my-life/next-shared/src/api/server-api';
import { revalidatePath, updateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { entityIdSchema } from '@/constants/entity-id-schema';
import { PATHS } from '@/constants/paths';

export const deleteCategory = async (id: string) => {
  await requireAuth();

  if (!entityIdSchema.safeParse(id).success) {
    return null;
  }

  const { error } = await categoryApiService.deleteCategory(id);

  if (error) {
    return null;
  }

  updateTag(CACHE_TAG.CATEGORIES);
  revalidatePath(PATHS.categories);

  return { success: true };
};
