import { CURRENCY_CODE_LIST } from '@track-my-life/shared/src/constants/currency';
import { MIN_FIELD_LENGTH } from '@track-my-life/shared/src/constants/list';
import { z } from 'zod';

import { transactionTypeSchema } from '@/constants/transaction';

export const createTransactionSchema = z.object({
  categoryId: z.uuid(),
  type: z.enum(transactionTypeSchema.options),
  amount: z.string().min(MIN_FIELD_LENGTH),
  currencyCode: z.enum(CURRENCY_CODE_LIST),
  date: z.string().min(MIN_FIELD_LENGTH),
  description: z.string().optional(),
});
