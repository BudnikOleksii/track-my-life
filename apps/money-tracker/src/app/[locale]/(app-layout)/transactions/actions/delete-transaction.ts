'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';

import { transactionApiService } from '@track-my-life/next-shared/src/api/server-api';

import { requireAuth } from '@/actions/require-auth';
import { entityIdSchema } from '@/constants/entity-id-schema';

import { revalidateTransactionCaches } from './revalidate-transaction-caches';

export const deleteTransaction = async (id: string): Promise<ServerActionResult<true>> => {
  await requireAuth();

  if (!entityIdSchema.safeParse(id).success) {
    return { ok: false, error: 'validationFailed' };
  }

  const { error } = await transactionApiService.deleteTransaction(id);

  if (error) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  revalidateTransactionCaches();
  return { ok: true, data: true };
};
