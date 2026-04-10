import { CURRENCY_CODE_LIST } from '@track-my-life/shared/src/constants/currency';
import { MIN_FIELD_LENGTH } from '@track-my-life/shared/src/constants/list';
import { z } from 'zod';

import { transactionTypeSchema } from '@/constants/transaction';

export const updateTransactionSchema = z.object({
  categoryId: z.uuid().optional(),
  type: z.enum(transactionTypeSchema.options).optional(),
  amount: z.string().min(MIN_FIELD_LENGTH).optional(),
  currencyCode: z.enum(CURRENCY_CODE_LIST).optional(),
  date: z.string().min(MIN_FIELD_LENGTH).optional(),
  description: z.string().optional(),
});
