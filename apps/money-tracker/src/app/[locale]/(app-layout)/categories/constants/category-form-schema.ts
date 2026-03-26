import { z } from 'zod';

export const TRANSACTION_TYPE = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const;

const MIN_NAME_LENGTH = 1;

export const categoryFormSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH, 'nameRequired'),
  type: z.enum([TRANSACTION_TYPE.INCOME, TRANSACTION_TYPE.EXPENSE], {
    message: 'typeRequired',
  }),
  parentCategoryId: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
