'use server';

import { recurringTransactionApiService } from '@track-my-life/next-shared/src/api/server-api';
import { revalidatePath, revalidateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

export const resumeRecurringTransaction = async (id: string) => {
  await requireAuth();

  const { error } = await recurringTransactionApiService.resumeRecurringTransaction(id);

  if (error) {
    return null;
  }

  revalidateTag(CACHE_TAG.RECURRING_TRANSACTIONS, 'max');
  revalidatePath(PATHS.recurringTransactions);
  return { success: true };
};
