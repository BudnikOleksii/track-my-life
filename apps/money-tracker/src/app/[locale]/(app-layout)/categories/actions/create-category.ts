'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';
import type {
  CategoryResponseDto,
  CreateCategoryDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { categoryApiService } from '@track-my-life/next-shared/src/api/server-api';
import { updateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';

import { categoryFormSchema } from '../constants/category-form-schema';

export const createCategory = async (
  input: CreateCategoryDto,
): Promise<ServerActionResult<CategoryResponseDto>> => {
  await requireAuth();

  const validated = categoryFormSchema.safeParse(input);

  if (!validated.success) {
    return { ok: false, error: 'validationFailed' };
  }

  const { data, error } = await categoryApiService.createCategory({
    name: validated.data.name,
    type: validated.data.type,
    ...(validated.data.parentCategoryId && {
      parentCategoryId: validated.data.parentCategoryId,
    }),
  });

  if (error || !data) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  updateTag(CACHE_TAG.CATEGORIES);

  return { ok: true, data };
};
