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

  const { data, error } = await transactionApiService.updateTransaction(id, {
    ...(validated.data.categoryId !== undefined && { categoryId: validated.data.categoryId }),
    ...(validated.data.type !== undefined && { type: validated.data.type }),
    ...(validated.data.amount !== undefined && { amount: validated.data.amount }),
    ...(validated.data.currencyCode !== undefined && { currencyCode: validated.data.currencyCode }),
    ...(validated.data.date !== undefined && { date: validated.data.date }),
    ...(validated.data.description !== undefined && { description: validated.data.description }),
  });

  if (error) {
    return null;
  }

  revalidateTransactionCaches();
  return data;
};
