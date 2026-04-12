import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { getYearMonth } from '@track-my-life/shared/src/utils/date/year-month';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchDailySpending } from '../../actions/fetch-daily-spending';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './DailySpendingChart.module.scss';

const DailySpendingChartContent = dynamic(
  () => import('./DailySpendingChartContent').then((mod) => mod.DailySpendingChartContent),
  { loading: () => null },
);

interface DailySpendingChartProps {
  filters: DashboardFilters;
}

const formatDayLabel = (dateString: string): string => {
  const date = new Date(dateString);
  return String(date.getDate());
};

export const DailySpendingChart = async ({ filters }: DailySpendingChartProps) => {
  const [translations, { year, month }] = await Promise.all([
    getTranslations(I18N_NAMESPACE.dashboardPage),
    getYearMonth(filters.dateTo),
  ]);

  const data = await fetchDailySpending({
    year,
    month,
    currencyCode: filters.currencyCode,
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  const dayList = data?.days ?? [];
  const chartData = dayList.map((day) => ({
    name: formatDayLabel(day.date),
    total: Number(day.total),
  }));

  return (
    <WidgetCard
      title={translations('content.dailySpendingTitle')}
      noDataLabel={translations('content.noData')}
      isEmpty={dayList.length === EMPTY_LIST_LENGTH}
    >
      <div className={styles.chartContainer}>
        <DailySpendingChartContent chartData={chartData} />
      </div>
    </WidgetCard>
  );
};
