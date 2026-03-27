import type { FilterValue } from '@/constants/transaction';

export const FILTER_TO_LABEL_KEY: Record<FilterValue, string> = {
  ALL: 'content.allTypes',
  INCOME: 'content.incomeType',
  EXPENSE: 'content.expenseType',
};
