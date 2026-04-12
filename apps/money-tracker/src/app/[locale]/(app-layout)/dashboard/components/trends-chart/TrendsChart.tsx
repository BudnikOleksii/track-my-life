import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { convertFilterDateList } from '@track-my-life/shared/src/utils/convert-filter-date-list';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';
import { getTimezoneOffset } from '@/utils/get-timezone-offset';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchTrends } from '../../actions/fetch-trends';
import { TRENDS_GRANULARITY } from '../../constants/dashboard';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './TrendsChart.module.scss';

const TrendsChartContent = dynamic(
  () => import('./TrendsChartContent').then((mod) => mod.TrendsChartContent),
  { loading: () => null },
);

interface TrendsChartProps {
  filters: DashboardFilters;
}

const formatPeriodLabel = (periodStart: string): string => {
  const date = new Date(periodStart);
  return date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
};

export const TrendsChart = async ({ filters }: TrendsChartProps) => {
  const [translations, offset] = await Promise.all([
    getTranslations(I18N_NAMESPACE.dashboardPage),
    getTimezoneOffset(),
  ]);

  const data = await fetchTrends({
    currencyCode: filters.currencyCode,
    granularity: TRENDS_GRANULARITY,
    ...convertFilterDateList(filters, offset),
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  const periodList = data?.periods ?? [];
  const chartData = periodList.map((period) => ({
    name: formatPeriodLabel(period.periodStart),
    income: Number(period.totalIncome),
    expenses: Number(period.totalExpenses),
  }));

  return (
    <WidgetCard
      title={translations('content.trendsTitle')}
      noDataLabel={translations('content.noData')}
      isEmpty={periodList.length === EMPTY_LIST_LENGTH}
    >
      <div className={styles.chartContainer}>
        <TrendsChartContent
          chartData={chartData}
          totalIncomeName={translations('content.totalIncome')}
          totalExpensesName={translations('content.totalExpenses')}
        />
      </div>
    </WidgetCard>
  );
};
