import { CURRENCY_CODE_LIST } from '@track-my-life/shared/src/constants/currency';
import { z } from 'zod';

import { transactionTypeSchema } from '@/constants/transaction';

const MIN_FIELD_LENGTH = 1;
const MIN_AMOUNT_LENGTH = 1;
const MIN_INTERVAL = 1;

const RECURRING_FREQUENCY = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
} as const;

export const recurringTransactionFormSchema = z.object({
  categoryId: z.string().min(MIN_FIELD_LENGTH, 'categoryRequired'),
  type: z.enum(transactionTypeSchema.options, { error: 'typeRequired' }),
  amount: z
    .string()
    .trim()
    .min(MIN_AMOUNT_LENGTH, 'amountRequired')
    .regex(/^\d+([.,]\d{1,2})?$/, 'amountInvalid'),
  currencyCode: z.enum(CURRENCY_CODE_LIST, { error: 'currencyRequired' }),
  frequency: z.enum(
    [
      RECURRING_FREQUENCY.DAILY,
      RECURRING_FREQUENCY.WEEKLY,
      RECURRING_FREQUENCY.MONTHLY,
      RECURRING_FREQUENCY.YEARLY,
    ],
    { error: 'frequencyRequired' },
  ),
  interval: z.number().int().min(MIN_INTERVAL, 'intervalInvalid'),
  startDate: z.string().min(MIN_FIELD_LENGTH, 'startDateRequired'),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export type RecurringTransactionFormValues = z.infer<typeof recurringTransactionFormSchema>;
