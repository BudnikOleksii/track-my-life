'use server';

import { categoryApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath, revalidateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

export const deleteCategory = async (id: string) => {
  await requireAuth();

  const { error } = await categoryApiService.deleteCategory(id);

  if (error) {
    return null;
  }

  revalidateTag(CACHE_TAG.CATEGORIES, 'max');
  revalidatePath(PATHS.categories);
  return { success: true };
};
