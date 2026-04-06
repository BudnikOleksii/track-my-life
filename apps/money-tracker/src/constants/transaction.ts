import type { BadgeVariant } from '@track-my-life/ui/src/components/atoms/badge/badge';

import { z } from 'zod';

export const transactionTypeSchema = z.enum(['INCOME', 'EXPENSE']);

export type TransactionType = z.infer<typeof transactionTypeSchema>;

export const TRANSACTION_TYPE = transactionTypeSchema.enum;

export const filterValueSchema = z.enum(['ALL', 'INCOME', 'EXPENSE']);

export type FilterValue = z.infer<typeof filterValueSchema>;

export const FILTER_OPTION_LIST = filterValueSchema.options;

export const TRANSACTION_TYPE_BADGE_VARIANT_MAP: Record<TransactionType, BadgeVariant> = {
  INCOME: 'success',
  EXPENSE: 'warning',
} as const;
