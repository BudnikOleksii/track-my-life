import { z } from 'zod';

const MIN_FIELD_LENGTH = 1;
const VALID_TYPE_SET = new Set(['expense', 'income']);

export const importRowSchema = z.object({
  Date: z.string().min(MIN_FIELD_LENGTH, 'dateRequired'),
  Category: z.string().min(MIN_FIELD_LENGTH, 'categoryRequired'),
  Type: z
    .string()
    .min(MIN_FIELD_LENGTH, 'typeRequired')
    .refine((val) => VALID_TYPE_SET.has(val.toLowerCase()), {
      message: 'typeInvalid',
    }),
  Amount: z.number({ error: 'amountInvalid' }).positive({ error: 'amountInvalid' }),
  Currency: z.string().min(MIN_FIELD_LENGTH, 'currencyRequired'),
  Subcategory: z.string().optional(),
});

export type ImportRow = z.infer<typeof importRowSchema>;
