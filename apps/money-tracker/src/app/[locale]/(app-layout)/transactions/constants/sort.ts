import type {
  SortOrder,
  TransactionSortBy,
} from '@track-my-life/shared/src/api/generated/types.gen';

export const SORT_BY_OPTION_LIST: TransactionSortBy[] = ['date', 'amount', 'createdAt'];

export const SORT_ORDER_OPTION_LIST: SortOrder[] = ['desc', 'asc'];

export const SORT_BY_TO_LABEL_KEY: Record<TransactionSortBy, string> = {
  date: 'content.sortByDate',
  amount: 'content.sortByAmount',
  createdAt: 'content.sortByCreatedAt',
};

export const DEFAULT_SORT_BY: TransactionSortBy = 'date';
export const DEFAULT_SORT_ORDER: SortOrder = 'desc';

export const VALID_SORT_BY_SET = new Set<string>(SORT_BY_OPTION_LIST);
export const VALID_SORT_ORDER_SET = new Set<string>(SORT_ORDER_OPTION_LIST);

export const checkIsSortBy = (value: string): value is TransactionSortBy =>
  VALID_SORT_BY_SET.has(value);

export const checkIsSortOrder = (value: string): value is SortOrder =>
  VALID_SORT_ORDER_SET.has(value);
