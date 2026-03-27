'use server';

import { categoryApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath } from 'next/cache';

import { PATHS } from '@/constants/paths';

export const deleteCategory = async (id: string) => {
  const { error } = await categoryApiService.deleteCategory(id);

  if (error) {
    return null;
  }

  revalidatePath(PATHS.categories);
  return { success: true };
};
