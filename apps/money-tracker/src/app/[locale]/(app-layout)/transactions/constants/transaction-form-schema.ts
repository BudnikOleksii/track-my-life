import { z } from 'zod';

import { TRANSACTION_TYPE } from '@/constants/transaction';

const MIN_AMOUNT_LENGTH = 1;
const MIN_FIELD_LENGTH = 1;

export const transactionFormSchema = z.object({
  categoryId: z.string().min(MIN_FIELD_LENGTH, 'categoryRequired'),
  type: z.enum([TRANSACTION_TYPE.INCOME, TRANSACTION_TYPE.EXPENSE], {
    error: 'typeRequired',
  }),
  amount: z.string().trim().min(MIN_AMOUNT_LENGTH, 'amountRequired'),
  currencyCode: z.string().min(MIN_FIELD_LENGTH, 'currencyRequired'),
  date: z.string().min(MIN_FIELD_LENGTH, 'dateRequired'),
  description: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
