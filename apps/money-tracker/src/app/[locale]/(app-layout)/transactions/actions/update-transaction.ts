'use server';

import type {
  CurrencyCode,
  UpdateTransactionDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionApiService } from '@track-my-life/shared/src/api/server-api';

import { requireAuth } from '@/actions/require-auth';

import { transactionFormSchema } from '../constants/transaction-form-schema';
import { revalidateTransactionCaches } from './revalidate-transaction-caches';

export const updateTransaction = async (id: string, body: UpdateTransactionDto) => {
  await requireAuth();

  const validated = transactionFormSchema.partial().safeParse(body);

  if (!validated.success) {
    return null;
  }

  const { categoryId, type, amount, currencyCode, date, description } = validated.data;
  const { data, error } = await transactionApiService.updateTransaction(id, {
    ...(categoryId !== undefined && { categoryId }),
    ...(type !== undefined && { type }),
    ...(amount !== undefined && { amount }),
    ...(currencyCode !== undefined && { currencyCode: currencyCode as CurrencyCode }),
    ...(date !== undefined && { date }),
    ...(description !== undefined && { description }),
  });

  if (error) {
    return null;
  }

  revalidateTransactionCaches();
  return data;
};
