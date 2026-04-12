'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';
import type {
  RecurringTransactionResponseDto,
  UpdateRecurringTransactionDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { recurringTransactionApiService } from '@track-my-life/next-shared/src/api/server-api';
import { updateTag } from 'next/cache';

import { redirectUnauthorized } from '@/actions/redirect-unauthorized';
import { CACHE_TAG } from '@/constants/cache-tag';
import { entityIdSchema } from '@/constants/entity-id-schema';

import { recurringTransactionFormSchema } from '../constants/recurring-transaction-form-schema';

// oxlint-disable-next-line max-statements
export const updateRecurringTransaction = async (
  id: string,
  body: UpdateRecurringTransactionDto,
): Promise<ServerActionResult<RecurringTransactionResponseDto>> => {
  await redirectUnauthorized();

  if (!entityIdSchema.safeParse(id).success) {
    return { ok: false, error: 'validationFailed' };
  }

  const validated = recurringTransactionFormSchema.partial().safeParse(body);

  if (!validated.success) {
    return { ok: false, error: 'validationFailed' };
  }

  const { data, error } = await recurringTransactionApiService.updateRecurringTransaction(id, {
    ...(validated.data.categoryId !== undefined && { categoryId: validated.data.categoryId }),
    ...(validated.data.type !== undefined && { type: validated.data.type }),
    ...(validated.data.amount !== undefined && { amount: validated.data.amount }),
    ...(validated.data.currencyCode !== undefined && {
      currencyCode: validated.data.currencyCode,
    }),
    ...(validated.data.frequency !== undefined && {
      frequency: validated.data.frequency,
    }),
    ...(validated.data.interval !== undefined && { interval: validated.data.interval }),
    ...(validated.data.startDate !== undefined && { startDate: validated.data.startDate }),
    ...(validated.data.endDate !== undefined && { endDate: validated.data.endDate }),
    ...(validated.data.description !== undefined && { description: validated.data.description }),
  });

  if (error || !data) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  updateTag(CACHE_TAG.RECURRING_TRANSACTIONS);

  return { ok: true, data };
};
