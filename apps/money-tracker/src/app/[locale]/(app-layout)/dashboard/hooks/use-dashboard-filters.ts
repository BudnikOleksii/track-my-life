import { useRouter } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import type { DashboardFilters } from '../constants/dashboard';

import { SEARCH_PARAM_KEY } from '../constants/dashboard';

const FILTER_KEY_TO_SEARCH_PARAM: Record<keyof DashboardFilters, string> = {
  currencyCode: SEARCH_PARAM_KEY.CURRENCY_CODE,
  dateFrom: SEARCH_PARAM_KEY.DATE_FROM,
  dateTo: SEARCH_PARAM_KEY.DATE_TO,
  type: SEARCH_PARAM_KEY.TYPE,
};

export const useDashboardFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  return { handleFilterChange };
};
