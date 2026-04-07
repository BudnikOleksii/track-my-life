'use server';

import type { CreateTransactionDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionApiService } from '@track-my-life/next-shared/src/api/server-api';

import { requireAuth } from '@/actions/require-auth';

import { transactionFormSchema } from '../constants/transaction-form-schema';
import { revalidateTransactionCaches } from './revalidate-transaction-caches';

export const createTransaction = async (input: CreateTransactionDto) => {
  await requireAuth();

  const validated = transactionFormSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { description, ...rest } = validated.data;
  const { data, error } = await transactionApiService.createTransaction({
    ...rest,
    currencyCode: rest.currencyCode,
    ...(description !== undefined && { description }),
  });

  if (error) {
    return null;
  }

  revalidateTransactionCaches();
  return data;
};
