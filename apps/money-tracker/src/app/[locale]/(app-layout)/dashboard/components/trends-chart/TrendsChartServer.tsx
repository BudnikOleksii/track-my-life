import type { FC } from 'react';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchTrends } from '../../actions/fetch-trends';
import { TRENDS_GRANULARITY } from '../../constants/dashboard';
import { TrendsChart } from './TrendsChart';

interface TrendsChartServerProps {
  filters: DashboardFilters;
}

export const TrendsChartServer: FC<TrendsChartServerProps> = async ({ filters }) => {
  const data = await fetchTrends({
    currencyCode: filters.currencyCode,
    granularity: TRENDS_GRANULARITY,
    ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
    ...(filters.dateTo && { dateTo: filters.dateTo }),
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  return <TrendsChart data={data} />;
};
