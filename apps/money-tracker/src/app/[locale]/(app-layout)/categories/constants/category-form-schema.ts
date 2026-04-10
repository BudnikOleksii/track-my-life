import { MIN_FIELD_LENGTH } from '@track-my-life/shared/src/constants/list';
import { z } from 'zod';

import { transactionTypeSchema } from '@/constants/transaction';

export const categoryFormSchema = z.object({
  name: z.string().trim().min(MIN_FIELD_LENGTH, 'nameRequired'),
  type: z.enum(transactionTypeSchema.options, { error: 'typeRequired' }),
  parentCategoryId: z.string().optional().nullable(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
