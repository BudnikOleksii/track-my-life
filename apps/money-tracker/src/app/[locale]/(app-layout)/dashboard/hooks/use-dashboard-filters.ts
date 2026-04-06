import { useUrlFilters } from '@/hooks/use-url-filters';

import type { DashboardFilters } from '../constants/dashboard';

import { SEARCH_PARAM_KEY } from '../constants/dashboard';

const FILTER_KEY_TO_SEARCH_PARAM: Record<keyof DashboardFilters, string> = {
  currencyCode: SEARCH_PARAM_KEY.CURRENCY_CODE,
  dateFrom: SEARCH_PARAM_KEY.DATE_FROM,
  dateTo: SEARCH_PARAM_KEY.DATE_TO,
  type: SEARCH_PARAM_KEY.TYPE,
};

export const useDashboardFilters = () =>
  useUrlFilters<Partial<DashboardFilters>>({
    filterKeyToSearchParam: FILTER_KEY_TO_SEARCH_PARAM,
  });
