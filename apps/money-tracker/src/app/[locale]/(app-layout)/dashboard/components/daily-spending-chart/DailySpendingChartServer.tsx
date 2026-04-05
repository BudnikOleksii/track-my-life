import type { FC } from 'react';

import { getYearMonth } from '@track-my-life/shared/src/utils/date';
import dynamic from 'next/dynamic';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchDailySpending } from '../../actions/fetch-daily-spending';

const DailySpendingChart = dynamic(
  () => import('./DailySpendingChart').then((mod) => mod.DailySpendingChart),
  { ssr: false },
);

interface DailySpendingChartServerProps {
  filters: DashboardFilters;
}

export const DailySpendingChartServer: FC<DailySpendingChartServerProps> = async ({ filters }) => {
  const { year, month } = getYearMonth(filters.dateTo);

  const data = await fetchDailySpending({
    year,
    month,
    currencyCode: filters.currencyCode,
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  return <DailySpendingChart data={data} />;
};
