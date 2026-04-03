'use server';

import type {
  CreateTransactionDto,
  CurrencyCode,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath, revalidateTag } from 'next/cache';

import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

import { transactionFormSchema } from '../constants/transaction-form-schema';

export const createTransaction = async (input: CreateTransactionDto) => {
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

  revalidateTag(CACHE_TAG.TRANSACTIONS, 'max');
  revalidateTag(CACHE_TAG.ANALYTICS, 'max');
  revalidatePath(PATHS.transactions);
  return data;
};
