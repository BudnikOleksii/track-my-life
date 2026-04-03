'use server';

import type {
  CreateRecurringTransactionDto,
  CurrencyCode,
  RecurringFrequency,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { recurringTransactionApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath } from 'next/cache';

import { PATHS } from '@/constants/paths';

import { recurringTransactionFormSchema } from '../constants/recurring-transaction-form-schema';

export const createRecurringTransaction = async (input: CreateRecurringTransactionDto) => {
  const validated = recurringTransactionFormSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { data, error } = await recurringTransactionApiService.createRecurringTransaction({
    ...validated.data,
    currencyCode: validated.data.currencyCode as CurrencyCode,
    frequency: validated.data.frequency as RecurringFrequency,
    endDate: validated.data.endDate || undefined,
    description: validated.data.description || undefined,
  });

  if (error) {
    return null;
  }

  revalidatePath(PATHS.recurringTransactions);
  return data;
};
