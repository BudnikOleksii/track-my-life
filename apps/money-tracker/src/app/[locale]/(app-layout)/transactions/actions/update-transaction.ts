'use server';

import type { UpdateTransactionDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionApiService } from '@track-my-life/next-shared/src/api/server-api';

import { requireAuth } from '@/actions/require-auth';
import { entityIdSchema } from '@/constants/entity-id-schema';

import { updateTransactionSchema } from '../constants/update-transaction-schema';
import { revalidateTransactionCaches } from './revalidate-transaction-caches';

const validateUpdateTransaction = (id: string, body: UpdateTransactionDto) => {
  if (!entityIdSchema.safeParse(id).success) {
    return null;
  }

  const validated = updateTransactionSchema.safeParse(body);

  if (!validated.success) {
    return null;
  }

  return validated;
};

export const updateTransaction = async (id: string, body: UpdateTransactionDto) => {
  await requireAuth();

  const validated = validateUpdateTransaction(id, body);

  if (!validated) {
    return null;
  }

  const { categoryId, type, amount, currencyCode, date, description } = body;
  const { data, error } = await transactionApiService.updateTransaction(id, {
    ...(categoryId !== undefined && { categoryId }),
    ...(type !== undefined && { type }),
    ...(amount !== undefined && { amount }),
    ...(currencyCode !== undefined && { currencyCode }),
    ...(date !== undefined && { date }),
    ...(description !== undefined && { description }),
  });

  if (error) {
    return null;
  }

  revalidateTransactionCaches();
  return data;
};
