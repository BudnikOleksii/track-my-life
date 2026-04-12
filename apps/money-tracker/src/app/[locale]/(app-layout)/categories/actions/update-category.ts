'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';
import type {
  CategoryResponseDto,
  UpdateCategoryDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { categoryApiService } from '@track-my-life/next-shared/src/api/server-api';
import { updateTag } from 'next/cache';

import { redirectUnauthorized } from '@/actions/redirect-unauthorized';
import { CACHE_TAG } from '@/constants/cache-tag';
import { entityIdSchema } from '@/constants/entity-id-schema';

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

export const updateCategory = async (
  id: string,
  body: UpdateCategoryDto,
): Promise<ServerActionResult<CategoryResponseDto>> => {
  await redirectUnauthorized();

  const validated = validateUpdateCategory(id, body);

  if (!validated) {
    return { ok: false, error: 'validationFailed' };
  }

  const { data, error } = await categoryApiService.updateCategory(id, {
    ...(validated.data.name !== undefined && { name: validated.data.name }),
    ...(validated.data.parentCategoryId !== undefined && {
      parentCategoryId: validated.data.parentCategoryId,
    }),
  });

  if (error || !data) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  updateTag(CACHE_TAG.CATEGORIES);

  return { ok: true, data };
};
