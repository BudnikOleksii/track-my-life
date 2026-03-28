import type { CurrencyCode } from '@track-my-life/shared/src/api/generated/types.gen';

import { useRouter } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import type { FilterValue } from '@/constants/transaction';

import { FILTER_OPTION_LIST } from '@/constants/transaction';

import {
  CURRENCY_CODE_LIST,
  DEFAULT_CURRENCY_CODE,
  SEARCH_PARAM_KEY,
} from '../constants/dashboard';

export interface DashboardFilters {
  dateFrom: string;
  dateTo: string;
  type: FilterValue;
  currencyCode: CurrencyCode;
}

const VALID_TYPE_SET = new Set<FilterValue>(FILTER_OPTION_LIST);

const FILTER_KEY_TO_SEARCH_PARAM: Record<keyof DashboardFilters, string> = {
  currencyCode: SEARCH_PARAM_KEY.CURRENCY_CODE,
  dateFrom: SEARCH_PARAM_KEY.DATE_FROM,
  dateTo: SEARCH_PARAM_KEY.DATE_TO,
  type: SEARCH_PARAM_KEY.TYPE,
};

const checkIsValidCurrencyCode = (value: string): value is CurrencyCode =>
  CURRENCY_CODE_LIST.includes(value as CurrencyCode);

const checkIsValidFilterType = (value: string): value is FilterValue =>
  VALID_TYPE_SET.has(value as FilterValue);

const parseFiltersFromSearchParams = (searchParams: URLSearchParams): DashboardFilters => {
  const rawCurrency = searchParams.get(SEARCH_PARAM_KEY.CURRENCY_CODE) ?? '';
  const rawType = searchParams.get(SEARCH_PARAM_KEY.TYPE) ?? '';

  return {
    dateFrom: searchParams.get(SEARCH_PARAM_KEY.DATE_FROM) ?? '',
    dateTo: searchParams.get(SEARCH_PARAM_KEY.DATE_TO) ?? '',
    type: checkIsValidFilterType(rawType) ? rawType : 'ALL',
    currencyCode: checkIsValidCurrencyCode(rawCurrency) ? rawCurrency : DEFAULT_CURRENCY_CODE,
  };
};

export const useDashboardFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filters = parseFiltersFromSearchParams(searchParams);

  const handleFilterChange = useCallback(
    (update: Partial<DashboardFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(update)) {
        const paramKey = FILTER_KEY_TO_SEARCH_PARAM[key as keyof DashboardFilters];

        if (value) {
          params.set(paramKey, value);
        } else {
          params.delete(paramKey);
        }
      }

      const queryString = params.toString();
      router.replace(queryString ? `?${queryString}` : '?', { scroll: false });
    },
    [searchParams, router],
  );

  return { filters, handleFilterChange };
};
