import type { FC } from 'react';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchDailySpending } from '../../actions/fetch-daily-spending';
import { DailySpendingChart } from './DailySpendingChart';

interface DailySpendingChartServerProps {
  filters: DashboardFilters;
}

const MONTH_OFFSET = 1;

const extractYearMonth = (dateString: string): { year: number; month: number } => {
  const date = dateString ? new Date(dateString) : new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + MONTH_OFFSET,
  };
};

export const DailySpendingChartServer: FC<DailySpendingChartServerProps> = async ({ filters }) => {
  const { year, month } = extractYearMonth(filters.dateTo);

  const data = await fetchDailySpending({
    year,
    month,
    currencyCode: filters.currencyCode,
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  return <DailySpendingChart data={data} />;
};
