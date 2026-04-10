'use server';

import type { UpdateCategoryDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { categoryApiService } from '@track-my-life/next-shared/src/api/server-api';
import { revalidatePath, updateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { entityIdSchema } from '@/constants/entity-id-schema';
import { PATHS } from '@/constants/paths';

import { categoryFormSchema } from '../constants/category-form-schema';

const validateUpdateCategory = (id: string, body: UpdateCategoryDto) => {
  if (!entityIdSchema.safeParse(id).success) {
    return null;
  }

  const validated = categoryFormSchema.partial().safeParse(body);

  if (!validated.success) {
    return null;
  }

  return validated;
};

export const updateCategory = async (id: string, body: UpdateCategoryDto) => {
  await requireAuth();

  const validated = validateUpdateCategory(id, body);

  if (!validated) {
    return null;
  }

  const { data, error } = await categoryApiService.updateCategory(id, {
    ...(validated.data.name !== undefined && { name: validated.data.name }),
    ...(validated.data.type !== undefined && { type: validated.data.type }),
    ...(validated.data.parentCategoryId !== undefined && {
      parentCategoryId: validated.data.parentCategoryId,
    }),
  });

  if (error) {
    return null;
  }

  updateTag(CACHE_TAG.CATEGORIES);
  revalidatePath(PATHS.categories);

  return data;
};
