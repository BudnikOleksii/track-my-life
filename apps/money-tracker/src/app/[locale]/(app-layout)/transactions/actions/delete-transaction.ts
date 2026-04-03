'use server';

import { transactionApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath, revalidateTag } from 'next/cache';

import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

export const deleteTransaction = async (id: string) => {
  const { error } = await transactionApiService.deleteTransaction(id);

  if (error) {
    return null;
  }

  revalidateTag(CACHE_TAG.TRANSACTIONS, 'max');
  revalidateTag(CACHE_TAG.ANALYTICS, 'max');
  revalidatePath(PATHS.transactions);
  return { success: true };
};
