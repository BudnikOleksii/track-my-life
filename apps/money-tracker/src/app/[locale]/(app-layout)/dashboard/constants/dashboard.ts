import type { CurrencyCode } from '@track-my-life/shared/src/api/generated/types.gen';

export const DEFAULT_CURRENCY_CODE: CurrencyCode = 'UAH';
export const TOP_CATEGORY_LIST_LIMIT = 5;
export const TRENDS_GRANULARITY = 'monthly' as const;
export const RECENT_TRANSACTION_LIST_LIMIT = 5;

export const CURRENCY_CODE_LIST: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'UAH'];

export const CHART_COLOR_LIST = [
  '#6366f1',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#ec4899',
  '#14b8a6',
] as const;

export const SEARCH_PARAM_KEY = {
  CURRENCY_CODE: 'currency',
  DATE_FROM: 'dateFrom',
  DATE_TO: 'dateTo',
  TYPE: 'type',
} as const;
