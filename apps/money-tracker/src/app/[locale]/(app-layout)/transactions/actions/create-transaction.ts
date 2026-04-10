'use server';

import type { CreateTransactionDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionApiService } from '@track-my-life/next-shared/src/api/server-api';

import { requireAuth } from '@/actions/require-auth';

import { createTransactionSchema } from '../constants/create-transaction-schema';
import { revalidateTransactionCaches } from './revalidate-transaction-caches';

export const createTransaction = async (input: CreateTransactionDto) => {
  await requireAuth();

  const validated = createTransactionSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await transactionApiService.createTransaction({
    categoryId: validated.data.categoryId,
    type: validated.data.type,
    amount: validated.data.amount,
    currencyCode: validated.data.currencyCode,
    date: validated.data.date,
    ...(validated.data.description !== undefined && { description: validated.data.description }),
  });

  if (error) {
    return null;
  }

  revalidateTransactionCaches();
  return data;
};
