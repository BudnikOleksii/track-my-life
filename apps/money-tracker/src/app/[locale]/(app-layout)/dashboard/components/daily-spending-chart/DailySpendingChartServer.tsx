import type { FC } from 'react';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchDailySpending } from '../../actions/fetch-daily-spending';
import { DailySpendingChart } from './DailySpendingChart';

interface DailySpendingChartServerProps {
  filters: DashboardFilters;
}

const MONTH_OFFSET = 1;
const YEAR_INDEX = 0;
const MONTH_INDEX = 1;

const getYearMonth = (dateString?: string): { year: number; month: number } => {
  if (!dateString) {
    const now = new Date();
    return { year: now.getUTCFullYear(), month: now.getUTCMonth() + MONTH_OFFSET };
  }

  const partList = dateString.split('-');
  return { year: Number(partList[YEAR_INDEX]), month: Number(partList[MONTH_INDEX]) };
};

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
