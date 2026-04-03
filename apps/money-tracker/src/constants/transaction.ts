import type { TransactionType } from '@track-my-life/shared/src/api/generated/types.gen';
import type { BadgeVariant } from '@track-my-life/ui/src/components/atoms/badge/badge';

export const TRANSACTION_TYPE: Record<TransactionType, TransactionType> = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const;

export type FilterValue = 'ALL' | TransactionType;

export const FILTER_OPTION_LIST: FilterValue[] = ['ALL', 'INCOME', 'EXPENSE'];

export const TRANSACTION_TYPE_BADGE_VARIANT_MAP: Record<TransactionType, BadgeVariant> = {
  INCOME: 'success',
  EXPENSE: 'warning',
} as const;
