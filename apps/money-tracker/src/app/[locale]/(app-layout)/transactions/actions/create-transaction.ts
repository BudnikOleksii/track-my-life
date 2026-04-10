'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';
import type {
  CreateTransactionDto,
  TransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionApiService } from '@track-my-life/next-shared/src/api/server-api';

import { requireAuth } from '@/actions/require-auth';

import { createTransactionSchema } from '../constants/create-transaction-schema';
import { revalidateTransactionCaches } from './revalidate-transaction-caches';

export const createTransaction = async (
  input: CreateTransactionDto,
): Promise<ServerActionResult<TransactionResponseDto>> => {
  await requireAuth();

  const validated = createTransactionSchema.safeParse(input);

  if (!validated.success) {
    return { ok: false, error: 'validationFailed' };
  }

  const { data, error } = await transactionApiService.createTransaction({
    categoryId: validated.data.categoryId,
    type: validated.data.type,
    amount: validated.data.amount,
    currencyCode: validated.data.currencyCode,
    date: validated.data.date,
    ...(validated.data.description !== undefined && { description: validated.data.description }),
  });

  if (error || !data) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  revalidateTransactionCaches();
  return { ok: true, data };
};
