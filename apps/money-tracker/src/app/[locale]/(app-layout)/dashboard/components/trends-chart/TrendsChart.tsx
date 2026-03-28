'use client';

import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { useTranslations } from 'next-intl';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { DashboardFilters } from '../../hooks/use-dashboard-filters';

import { fetchTrends } from '../../actions/fetch-trends';
import { TRENDS_GRANULARITY } from '../../constants/dashboard';
import { useWidgetData } from '../../hooks/use-widget-data';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './TrendsChart.module.scss';

interface TrendsChartProps {
  filters: DashboardFilters;
}

const CHART_HEIGHT = 300;
const INCOME_COLOR = '#22c55e';
const EXPENSE_COLOR = '#ef4444';

const formatPeriodLabel = (periodStart: string): string => {
  const date = new Date(periodStart);
  return date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
};

export const TrendsChart: FC<TrendsChartProps> = ({ filters }) => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);

  const { data, isLoading } = useWidgetData(
    () =>
      fetchTrends({
        currencyCode: filters.currencyCode,
        granularity: TRENDS_GRANULARITY,
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
        ...(filters.type !== 'ALL' && { type: filters.type }),
      }),
    `trends-${filters.currencyCode}-${filters.dateFrom}-${filters.dateTo}-${filters.type}`,
  );

  const periodList = data?.periods ?? [];
  const chartData = periodList.map((period) => ({
    name: formatPeriodLabel(period.periodStart),
    income: Number(period.totalIncome),
    expenses: Number(period.totalExpenses),
  }));

  return (
    <WidgetCard
      title={translations('content.trendsTitle')}
      isLoading={isLoading}
      isEmpty={periodList.length === EMPTY_LIST_LENGTH}
    >
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" name={translations('content.totalIncome')} fill={INCOME_COLOR} />
            <Bar
              dataKey="expenses"
              name={translations('content.totalExpenses')}
              fill={EXPENSE_COLOR}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
};
