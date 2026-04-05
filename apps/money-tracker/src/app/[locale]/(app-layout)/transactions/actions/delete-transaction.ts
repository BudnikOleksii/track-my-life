'use server';

import { transactionApiService } from '@track-my-life/shared/src/api/server-api';

import { revalidateTransactionCaches } from './revalidate-transaction-caches';

export const deleteTransaction = async (id: string) => {
  const { error } = await transactionApiService.deleteTransaction(id);

  if (error) {
    return null;
  }

  revalidateTransactionCaches();
  return { success: true };
};
