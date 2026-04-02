import { useRouter } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import type { RecurringTransactionFilterStatus } from '../constants/recurring-transaction-list';

import { DEFAULT_PAGE } from '../constants/recurring-transaction-list';

interface RecurringTransactionFilterUpdate {
  page?: number;
  pageSize?: number;
  status?: RecurringTransactionFilterStatus;
}

const SEARCH_PARAM_KEY = {
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
  STATUS: 'status',
} as const;

const FILTER_KEY_TO_SEARCH_PARAM: Record<keyof RecurringTransactionFilterUpdate, string> = {
  page: SEARCH_PARAM_KEY.PAGE,
  pageSize: SEARCH_PARAM_KEY.PAGE_SIZE,
  status: SEARCH_PARAM_KEY.STATUS,
};

const PAGE_RESET_KEY_SET = new Set<string>(['status', 'pageSize']);

const checkShouldResetPage = (update: RecurringTransactionFilterUpdate): boolean =>
  Object.keys(update).some((key) => PAGE_RESET_KEY_SET.has(key));

export const useRecurringTransactionFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = useCallback(
    (update: RecurringTransactionFilterUpdate) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(update)) {
        const paramKey = FILTER_KEY_TO_SEARCH_PARAM[key as keyof RecurringTransactionFilterUpdate];

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
