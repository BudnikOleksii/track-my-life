import type { CurrencyCode } from '@track-my-life/shared/src/api/generated/types.gen';

import type { FilterValue } from '@/constants/transaction';

import { normalizeParam } from '@/constants/normalize-param';
import { FILTER_OPTION_LIST } from '@/constants/transaction';

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

export interface DashboardFilters {
  dateFrom: string;
  dateTo: string;
  type: FilterValue;
  currencyCode: CurrencyCode;
}

const VALID_TYPE_SET = new Set<FilterValue>(FILTER_OPTION_LIST);

const checkIsValidCurrencyCode = (value: string): value is CurrencyCode =>
  CURRENCY_CODE_LIST.includes(value as CurrencyCode);

const checkIsValidFilterType = (value: string): value is FilterValue =>
  VALID_TYPE_SET.has(value as FilterValue);

export const parseDashboardSearchParams = (
  searchParams: Record<string, string | string[] | undefined>,
): DashboardFilters => {
  const rawCurrency = normalizeParam(searchParams[SEARCH_PARAM_KEY.CURRENCY_CODE]);
  const rawType = normalizeParam(searchParams[SEARCH_PARAM_KEY.TYPE]);

  return {
    dateFrom: normalizeParam(searchParams[SEARCH_PARAM_KEY.DATE_FROM]),
    dateTo: normalizeParam(searchParams[SEARCH_PARAM_KEY.DATE_TO]),
    type: checkIsValidFilterType(rawType) ? rawType : 'ALL',
    currencyCode: checkIsValidCurrencyCode(rawCurrency) ? rawCurrency : DEFAULT_CURRENCY_CODE,
  };
};
