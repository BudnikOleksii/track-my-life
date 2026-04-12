import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { convertFilterDateList } from '@track-my-life/shared/src/utils/convert-filter-date-list';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';
import { getTimezoneOffset } from '@/utils/get-timezone-offset';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchCategoryBreakdown } from '../../actions/fetch-category-breakdown';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './CategoryBreakdownChart.module.scss';

const CategoryBreakdownChartContent = dynamic(
  () => import('./CategoryBreakdownChartContent').then((mod) => mod.CategoryBreakdownChartContent),
  { loading: () => null },
);

interface CategoryBreakdownChartProps {
  filters: DashboardFilters;
}

export const CategoryBreakdownChart = async ({ filters }: CategoryBreakdownChartProps) => {
  const [translations, offset] = await Promise.all([
    getTranslations(I18N_NAMESPACE.dashboardPage),
    getTimezoneOffset(),
  ]);

  const data = await fetchCategoryBreakdown({
    currencyCode: filters.currencyCode,
    ...convertFilterDateList(filters, offset),
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  const breakdownList = data?.breakdown ?? [];

  return (
    <WidgetCard
      title={translations('content.categoryBreakdownTitle')}
      noDataLabel={translations('content.noData')}
      isEmpty={breakdownList.length === EMPTY_LIST_LENGTH}
    >
      <div className={styles.chartContainer}>
        {data && <CategoryBreakdownChartContent data={data} />}
      </div>
    </WidgetCard>
  );
};
