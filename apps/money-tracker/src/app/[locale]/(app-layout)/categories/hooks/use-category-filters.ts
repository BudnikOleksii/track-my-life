import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import type { FilterValue } from '@/constants/transaction';

import { useUrlFilters } from '@/hooks/use-url-filters';

import { SEARCH_PARAM_KEY } from '../constants/categories';

const FILTER_KEY_TO_SEARCH_PARAM = { type: SEARCH_PARAM_KEY.TYPE } as const;

export const useCategoryFilters = () => {
  const searchParams = useSearchParams();

  const rawType = searchParams.get(SEARCH_PARAM_KEY.TYPE);
  const activeFilter: FilterValue = rawType === 'INCOME' || rawType === 'EXPENSE' ? rawType : 'ALL';

  const { handleFilterChange: updateFilter } = useUrlFilters<{ type: FilterValue }>({
    filterKeyToSearchParam: FILTER_KEY_TO_SEARCH_PARAM,
  });

  const handleFilterChange = useCallback(
    (type: FilterValue) => {
      updateFilter({ type });
    },
    [updateFilter],
  );

  return { activeFilter, handleFilterChange };
};
