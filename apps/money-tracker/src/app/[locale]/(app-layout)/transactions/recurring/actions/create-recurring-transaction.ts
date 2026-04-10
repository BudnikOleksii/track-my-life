'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';
import type {
  CreateRecurringTransactionDto,
  RecurringTransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { recurringTransactionApiService } from '@track-my-life/next-shared/src/api/server-api';
import { revalidatePath, updateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

import { recurringTransactionFormSchema } from '../constants/recurring-transaction-form-schema';

export const createRecurringTransaction = async (
  input: CreateRecurringTransactionDto,
): Promise<ServerActionResult<RecurringTransactionResponseDto>> => {
  await requireAuth();

  const validated = recurringTransactionFormSchema.safeParse(input);

  if (!validated.success) {
    return { ok: false, error: 'validationFailed' };
  }

  const { data, error } = await recurringTransactionApiService.createRecurringTransaction({
    categoryId: validated.data.categoryId,
    type: validated.data.type,
    amount: validated.data.amount,
    currencyCode: validated.data.currencyCode,
    frequency: validated.data.frequency,
    interval: validated.data.interval,
    startDate: validated.data.startDate,
    ...(validated.data.endDate !== undefined && { endDate: validated.data.endDate }),
    ...(validated.data.description !== undefined && { description: validated.data.description }),
  });

  if (error || !data) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  updateTag(CACHE_TAG.RECURRING_TRANSACTIONS);
  revalidatePath(PATHS.recurringTransactions);

  return { ok: true, data };
};
