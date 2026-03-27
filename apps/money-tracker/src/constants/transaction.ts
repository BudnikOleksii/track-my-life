import type { TransactionType } from '../../../../packages/shared/src/api/generated';

export const TRANSACTION_TYPE: Record<TransactionType, TransactionType> = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const;

export type FilterValue = 'ALL' | TransactionType;

export const FILTER_OPTION_LIST: FilterValue[] = ['ALL', 'INCOME', 'EXPENSE'];
