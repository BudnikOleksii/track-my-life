'use server';

import { recurringTransactionApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath } from 'next/cache';

import { PATHS } from '@/constants/paths';

export const resumeRecurringTransaction = async (id: string) => {
  const { error } = await recurringTransactionApiService.resumeRecurringTransaction(id);

  if (error) {
    return null;
  }

  revalidatePath(PATHS.recurringTransactions);
  return { success: true };
};
