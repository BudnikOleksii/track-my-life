import type { TransactionType } from '@track-my-life/shared/src/api/generated/types.gen';

export const TRANSACTION_TYPE: Record<TransactionType, TransactionType> = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const;

export type FilterValue = 'ALL' | TransactionType;

export const FILTER_OPTION_LIST: FilterValue[] = ['ALL', 'INCOME', 'EXPENSE'];
