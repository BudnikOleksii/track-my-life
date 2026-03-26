'use server';

import type { CreateCategoryDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { categoryApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath } from 'next/cache';

import { PATHS } from '@/constants/paths';

import { categoryFormSchema } from '../constants/category-form-schema';

export const createCategory = async (input: CreateCategoryDto) => {
  const validated = categoryFormSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await categoryApiService.createCategory(validated.data);

  if (error) {
    return null;
  }

  revalidatePath(PATHS.categories);
  return data;
};
