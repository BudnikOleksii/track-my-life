'use server';

import type { UpdateCategoryDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { categoryApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath, revalidateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

import { categoryFormSchema } from '../constants/category-form-schema';

export const updateCategory = async (id: string, body: UpdateCategoryDto) => {
  await requireAuth();

  const validated = categoryFormSchema.partial().safeParse(body);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await categoryApiService.updateCategory(id, body);

  if (error) {
    return null;
  }

  revalidateTag(CACHE_TAG.CATEGORIES, 'max');
  revalidatePath(PATHS.categories);
  return data;
};
