'use client';

import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { useTranslations } from 'next-intl';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { DashboardFilters } from '../../hooks/use-dashboard-filters';

import { fetchDailySpending } from '../../actions/fetch-daily-spending';
import { useWidgetData } from '../../hooks/use-widget-data';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './DailySpendingChart.module.scss';

interface DailySpendingChartProps {
  filters: DashboardFilters;
}

const CHART_HEIGHT = 300;
const SPENDING_COLOR = '#6366f1';
const MONTH_OFFSET = 1;

const extractYearMonth = (dateString: string): { year: number; month: number } => {
  const date = dateString ? new Date(dateString) : new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + MONTH_OFFSET,
  };
};

const formatDayLabel = (dateString: string): string => {
  const date = new Date(dateString);
  return String(date.getDate());
};

export const DailySpendingChart: FC<DailySpendingChartProps> = ({ filters }) => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);

  const { year, month } = extractYearMonth(filters.dateTo);

  const { data, isLoading } = useWidgetData(
    () =>
      fetchDailySpending({
        year,
        month,
        currencyCode: filters.currencyCode,
        ...(filters.type !== 'ALL' && { type: filters.type }),
      }),
    `daily-${year}-${month}-${filters.currencyCode}-${filters.type}`,
  );

  const dayList = data?.days ?? [];
  const chartData = dayList.map((day) => ({
    name: formatDayLabel(day.date),
    total: Number(day.total),
  }));

  return (
    <WidgetCard
      title={translations('content.dailySpendingTitle')}
      isLoading={isLoading}
      isEmpty={dayList.length === EMPTY_LIST_LENGTH}
    >
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill={SPENDING_COLOR} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
};
