import { z } from 'zod';

import { TRANSACTION_TYPE } from '@/constants/transaction';

const MIN_NAME_LENGTH = 1;

export const categoryFormSchema = z.object({
  name: z.string().trim().min(MIN_NAME_LENGTH, 'nameRequired'),
  type: z.enum([TRANSACTION_TYPE.INCOME, TRANSACTION_TYPE.EXPENSE], {
    error: 'typeRequired',
  }),
  parentCategoryId: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
