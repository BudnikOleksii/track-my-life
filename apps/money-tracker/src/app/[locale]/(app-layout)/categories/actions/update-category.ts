'use server';

import type { UpdateCategoryDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { categoryApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath } from 'next/cache';

import { PATHS } from '@/constants/paths';

export const updateCategory = async (id: string, body: UpdateCategoryDto) => {
  const { data, error } = await categoryApiService.updateCategory(id, body);

  if (error) {
    return null;
  }

  revalidatePath(PATHS.categories);
  return data;
};
