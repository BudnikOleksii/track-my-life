'use server';

import { transactionApiService } from '@track-my-life/shared/src/api/server-api';

import { requireAuth } from '@/actions/require-auth';

import { revalidateTransactionCaches } from './revalidate-transaction-caches';

export const deleteTransaction = async (id: string) => {
  await requireAuth();

  const { error } = await transactionApiService.deleteTransaction(id);

  if (error) {
    return null;
  }

  revalidateTransactionCaches();
  return { success: true };
};
