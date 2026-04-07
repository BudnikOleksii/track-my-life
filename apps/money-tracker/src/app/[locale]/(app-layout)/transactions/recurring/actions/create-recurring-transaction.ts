'use server';

import type {
  CreateRecurringTransactionDto,
  RecurringFrequency,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { recurringTransactionApiService } from '@track-my-life/next-shared/src/api/server-api';
import { revalidatePath, revalidateTag } from 'next/cache';

import { requireAuth } from '@/actions/require-auth';
import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

import { recurringTransactionFormSchema } from '../constants/recurring-transaction-form-schema';

export const createRecurringTransaction = async (input: CreateRecurringTransactionDto) => {
  await requireAuth();

  const validated = recurringTransactionFormSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await recurringTransactionApiService.createRecurringTransaction({
    categoryId: validated.data.categoryId,
    type: validated.data.type,
    amount: validated.data.amount,
    currencyCode: validated.data.currencyCode,
    frequency: validated.data.frequency as RecurringFrequency,
    interval: validated.data.interval,
    startDate: validated.data.startDate,
    ...(validated.data.endDate !== undefined && { endDate: validated.data.endDate }),
    ...(validated.data.description !== undefined && { description: validated.data.description }),
  });

  if (error) {
    return null;
  }

  revalidateTag(CACHE_TAG.RECURRING_TRANSACTIONS, 'max');
  revalidatePath(PATHS.recurringTransactions);
  return data;
};
