import type { RecurringFrequency } from '@track-my-life/shared/src/api/generated/types.gen';

import { CURRENCY_CODE_LIST } from '@track-my-life/shared/src/constants/currency';
import { MIN_FIELD_LENGTH } from '@track-my-life/shared/src/constants/list';
import { z } from 'zod';

import { transactionTypeSchema } from '@/constants/transaction';
const MIN_INTERVAL = 1;

const RECURRING_FREQUENCY_LIST = [
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
] as const satisfies readonly RecurringFrequency[];

export const recurringTransactionFormSchema = z.object({
  categoryId: z.string().min(MIN_FIELD_LENGTH, 'categoryRequired'),
  type: z.enum(transactionTypeSchema.options, { error: 'typeRequired' }),
  amount: z
    .string()
    .trim()
    .min(MIN_FIELD_LENGTH, 'amountRequired')
    .regex(/^\d+([.,]\d{1,2})?$/, 'amountInvalid'),
  currencyCode: z.enum(CURRENCY_CODE_LIST, { error: 'currencyRequired' }),
  frequency: z.enum(RECURRING_FREQUENCY_LIST, { error: 'frequencyRequired' }),
  interval: z.number().int().min(MIN_INTERVAL, 'intervalInvalid'),
  startDate: z.string().min(MIN_FIELD_LENGTH, 'startDateRequired'),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export type RecurringTransactionFormValues = z.infer<typeof recurringTransactionFormSchema>;
