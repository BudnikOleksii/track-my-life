'use server';

import { transactionApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath } from 'next/cache';

import { PATHS } from '@/constants/paths';

export const deleteTransaction = async (id: string) => {
  const { error } = await transactionApiService.deleteTransaction(id);

  if (error) {
    return null;
  }

  revalidatePath(PATHS.transactions);
  return { success: true };
};
