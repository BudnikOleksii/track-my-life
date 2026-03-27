'use server';

import type { UpdateTransactionDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath } from 'next/cache';

import { PATHS } from '@/constants/paths';

import { transactionFormSchema } from '../constants/transaction-form-schema';

export const updateTransaction = async (id: string, body: UpdateTransactionDto) => {
  const validated = transactionFormSchema.partial().safeParse(body);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await transactionApiService.updateTransaction(id, body);

  if (error) {
    return null;
  }

  revalidatePath(PATHS.transactions);
  return data;
};
