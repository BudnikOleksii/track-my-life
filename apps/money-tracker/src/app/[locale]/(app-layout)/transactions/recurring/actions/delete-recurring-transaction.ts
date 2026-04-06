'use server';

import { recurringTransactionApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath, revalidateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

export const deleteRecurringTransaction = async (id: string) => {
  await requireAuth();

  const { error } = await recurringTransactionApiService.deleteRecurringTransaction(id);

  if (error) {
    return null;
  }

  revalidateTag(CACHE_TAG.RECURRING_TRANSACTIONS, 'max');
  revalidatePath(PATHS.recurringTransactions);
  return { success: true };
};
