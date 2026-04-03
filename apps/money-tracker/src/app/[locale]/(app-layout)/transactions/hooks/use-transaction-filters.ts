import { useRouter } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import type { FilterValue } from '@/constants/transaction';

import { DEFAULT_PAGE } from '../constants/transaction-list';

interface TransactionFilterUpdate {
  page?: number;
  pageSize?: number;
  type?: FilterValue;
  dateFrom?: string;
  dateTo?: string;
  categoryId?: string;
  currencyCode?: string;
  sortBy?: string;
  sortOrder?: string;
}

const SEARCH_PARAM_KEY = {
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
  TYPE: 'type',
  DATE_FROM: 'dateFrom',
  DATE_TO: 'dateTo',
  CATEGORY_ID: 'categoryId',
  CURRENCY_CODE: 'currencyCode',
  SORT_BY: 'sortBy',
  SORT_ORDER: 'sortOrder',
} as const;

const FILTER_KEY_TO_SEARCH_PARAM: Record<keyof TransactionFilterUpdate, string> = {
  page: SEARCH_PARAM_KEY.PAGE,
  pageSize: SEARCH_PARAM_KEY.PAGE_SIZE,
  type: SEARCH_PARAM_KEY.TYPE,
  dateFrom: SEARCH_PARAM_KEY.DATE_FROM,
  dateTo: SEARCH_PARAM_KEY.DATE_TO,
  categoryId: SEARCH_PARAM_KEY.CATEGORY_ID,
  currencyCode: SEARCH_PARAM_KEY.CURRENCY_CODE,
  sortBy: SEARCH_PARAM_KEY.SORT_BY,
  sortOrder: SEARCH_PARAM_KEY.SORT_ORDER,
};

const PAGE_RESET_KEY_SET = new Set<string>([
  'type',
  'dateFrom',
  'dateTo',
  'pageSize',
  'categoryId',
  'currencyCode',
  'sortBy',
  'sortOrder',
]);

const checkShouldResetPage = (update: TransactionFilterUpdate): boolean =>
  Object.keys(update).some((key) => PAGE_RESET_KEY_SET.has(key));

export const useTransactionFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = useCallback(
    (update: TransactionFilterUpdate) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(update)) {
        const paramKey = FILTER_KEY_TO_SEARCH_PARAM[key as keyof TransactionFilterUpdate];

        if (value !== undefined && value !== '' && value !== 'ALL') {
          params.set(paramKey, String(value));
        } else {
          params.delete(paramKey);
        }
      }

      if (checkShouldResetPage(update) && !update.page) {
        params.set(SEARCH_PARAM_KEY.PAGE, String(DEFAULT_PAGE));
      }

      const queryString = params.toString();
      router.replace(queryString ? `?${queryString}` : '?', { scroll: false });
    },
    [searchParams, router],
  );

  return { handleFilterChange };
};
