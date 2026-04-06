'use server';

import type {
  CreateTransactionDto,
  CurrencyCode,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionApiService } from '@track-my-life/shared/src/api/server-api';

import { requireAuth } from '@/actions/require-auth';

import { transactionFormSchema } from '../constants/transaction-form-schema';
import { revalidateTransactionCaches } from './revalidate-transaction-caches';

export const createTransaction = async (input: CreateTransactionDto) => {
  await requireAuth();

  const validated = transactionFormSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await transactionApiService.createTransaction({
    ...validated.data,
    currencyCode: validated.data.currencyCode as CurrencyCode,
  });

  if (error) {
    return null;
  }

  revalidateTransactionCaches();
  return data;
};
