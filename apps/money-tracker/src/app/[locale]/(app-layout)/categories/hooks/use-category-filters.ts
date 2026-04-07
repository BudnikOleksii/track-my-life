import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import type { FilterValue } from '@/constants/transaction';

import { SEARCH_PARAM_KEY } from '../constants/categories';

export const useCategoryFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawType = searchParams.get(SEARCH_PARAM_KEY.TYPE);
  const activeFilter: FilterValue = rawType === 'INCOME' || rawType === 'EXPENSE' ? rawType : 'ALL';

  const handleFilterChange = useCallback(
    (type: FilterValue) => {
      const params = new URLSearchParams(searchParams.toString());

      if (type !== 'ALL') {
        params.set(SEARCH_PARAM_KEY.TYPE, type);
      } else {
        params.delete(SEARCH_PARAM_KEY.TYPE);
      }

      const queryString = params.toString();
      router.replace(queryString ? `?${queryString}` : '?', { scroll: false });
    },
    [searchParams, router],
  );

  return { activeFilter, handleFilterChange };
};
