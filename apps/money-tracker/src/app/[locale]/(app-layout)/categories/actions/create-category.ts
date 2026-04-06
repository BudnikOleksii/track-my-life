'use server';

import type { CreateCategoryDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { categoryApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath, revalidateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

import { categoryFormSchema } from '../constants/category-form-schema';

export const createCategory = async (input: CreateCategoryDto) => {
  await requireAuth();

  const validated = categoryFormSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await categoryApiService.createCategory({
    name: validated.data.name,
    type: validated.data.type,
    ...(validated.data.parentCategoryId !== undefined && {
      parentCategoryId: validated.data.parentCategoryId,
    }),
  });

  if (error) {
    return null;
  }

  revalidateTag(CACHE_TAG.CATEGORIES, 'max');
  revalidatePath(PATHS.categories);

  return data;
};
