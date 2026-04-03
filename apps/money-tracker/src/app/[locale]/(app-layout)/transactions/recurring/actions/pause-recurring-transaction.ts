'use server';

import { recurringTransactionApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath } from 'next/cache';

import { PATHS } from '@/constants/paths';

export const pauseRecurringTransaction = async (id: string) => {
  const { error } = await recurringTransactionApiService.pauseRecurringTransaction(id);

  if (error) {
    return null;
  }

  revalidatePath(PATHS.recurringTransactions);
  return { success: true };
};
