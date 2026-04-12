'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';

import { recurringTransactionApiService } from '@track-my-life/next-shared/src/api/server-api';
import { updateTag } from 'next/cache';

import { redirectUnauthorized } from '@/actions/redirect-unauthorized';
import { CACHE_TAG } from '@/constants/cache-tag';
import { entityIdSchema } from '@/constants/entity-id-schema';

export const pauseRecurringTransaction = async (id: string): Promise<ServerActionResult<true>> => {
  await redirectUnauthorized();

  if (!entityIdSchema.safeParse(id).success) {
    return { ok: false, error: 'validationFailed' };
  }

  const { error } = await recurringTransactionApiService.pauseRecurringTransaction(id);

  if (error) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  updateTag(CACHE_TAG.RECURRING_TRANSACTIONS);

  return { ok: true, data: true };
};
