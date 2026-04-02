export const SORT_BY_OPTION_LIST = ['date', 'amount', 'createdAt'] as const;

export const SORT_ORDER_OPTION_LIST = ['desc', 'asc'] as const;

export const SORT_BY_TO_LABEL_KEY = {
  date: 'content.sortByDate',
  amount: 'content.sortByAmount',
  createdAt: 'content.sortByCreatedAt',
} as const;

export const DEFAULT_SORT_BY = 'date';
export const DEFAULT_SORT_ORDER = 'desc';
