import { z } from 'zod';

import { transactionTypeSchema } from '@/constants/transaction';

const MIN_AMOUNT_LENGTH = 1;
const MIN_FIELD_LENGTH = 1;

export const transactionFormSchema = z.object({
  categoryId: z.string().min(MIN_FIELD_LENGTH, 'categoryRequired'),
  type: z.enum(transactionTypeSchema.options, { error: 'typeRequired' }),
  amount: z
    .string()
    .trim()
    .min(MIN_AMOUNT_LENGTH, 'amountRequired')
    .regex(/^\d+([.,]\d{1,2})?$/, 'amountInvalid'),
  date: z.string().min(MIN_FIELD_LENGTH, 'dateRequired'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'timeInvalid'),
  description: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
