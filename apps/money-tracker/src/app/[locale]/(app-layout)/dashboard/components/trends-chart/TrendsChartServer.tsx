import type { FC } from 'react';

import { convertFilterDateList } from '@track-my-life/shared/src/utils/convert-filter-date-list';
import dynamic from 'next/dynamic';

import { getTimezoneOffset } from '@/utils/get-timezone-offset';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchTrends } from '../../actions/fetch-trends';
import { TRENDS_GRANULARITY } from '../../constants/dashboard';

const TrendsChart = dynamic(() => import('./TrendsChart').then((mod) => mod.TrendsChart), {
  loading: () => null,
});

interface TrendsChartServerProps {
  filters: DashboardFilters;
}

export const TrendsChartServer: FC<TrendsChartServerProps> = async ({ filters }) => {
  const offset = await getTimezoneOffset();
  const data = await fetchTrends({
    currencyCode: filters.currencyCode,
    granularity: TRENDS_GRANULARITY,
    ...convertFilterDateList(filters, offset),
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  return <TrendsChart data={data} />;
};
