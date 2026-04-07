'use server';

import type {
  RecurringFrequency,
  UpdateRecurringTransactionDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { recurringTransactionApiService } from '@track-my-life/next-shared/src/api/server-api';
import { revalidatePath, updateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

import { recurringTransactionFormSchema } from '../constants/recurring-transaction-form-schema';

export const updateRecurringTransaction = async (
  id: string,
  body: UpdateRecurringTransactionDto,
) => {
  await requireAuth();

  const validated = recurringTransactionFormSchema.partial().safeParse(body);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await recurringTransactionApiService.updateRecurringTransaction(id, {
    ...(validated.data.categoryId !== undefined && { categoryId: validated.data.categoryId }),
    ...(validated.data.type !== undefined && { type: validated.data.type }),
    ...(validated.data.amount !== undefined && { amount: validated.data.amount }),
    ...(validated.data.currencyCode !== undefined && {
      currencyCode: validated.data.currencyCode,
    }),
    ...(validated.data.frequency !== undefined && {
      frequency: validated.data.frequency as RecurringFrequency,
    }),
    ...(validated.data.interval !== undefined && { interval: validated.data.interval }),
    ...(validated.data.startDate !== undefined && { startDate: validated.data.startDate }),
    ...(validated.data.endDate !== undefined && { endDate: validated.data.endDate }),
    ...(validated.data.description !== undefined && { description: validated.data.description }),
  });

  if (error) {
    return null;
  }

  updateTag(CACHE_TAG.RECURRING_TRANSACTIONS);
  revalidatePath(PATHS.recurringTransactions);

  return data;
};
