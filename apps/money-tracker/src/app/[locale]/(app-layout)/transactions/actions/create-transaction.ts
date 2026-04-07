'use server';

import type { CreateTransactionDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionApiService } from '@track-my-life/next-shared/src/api/server-api';

import { requireAuth } from '@/actions/require-auth';

import { revalidateTransactionCaches } from './revalidate-transaction-caches';

export const createTransaction = async (input: CreateTransactionDto) => {
  await requireAuth();

  const { description, ...rest } = input;
  const { data, error } = await transactionApiService.createTransaction({
    ...rest,
    ...(description !== undefined && { description }),
  });

  if (error) {
    return null;
  }

  revalidateTransactionCaches();
  return data;
};
