import type { TransactionType } from '@track-my-life/shared/src/api/generated/types.gen';

import { z } from 'zod';

export const TRANSACTION_TYPE: Record<TransactionType, TransactionType> = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const;

const MIN_NAME_LENGTH = 1;

export const categoryFormSchema = z.object({
  name: z.string().trim().min(MIN_NAME_LENGTH, 'nameRequired'),
  type: z.enum([TRANSACTION_TYPE.INCOME, TRANSACTION_TYPE.EXPENSE], {
    error: 'typeRequired',
  }),
  parentCategoryId: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
