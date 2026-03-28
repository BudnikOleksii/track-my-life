'use client';

import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { useTranslations } from 'next-intl';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { DashboardFilters } from '../../hooks/use-dashboard-filters';

import { fetchCategoryBreakdown } from '../../actions/fetch-category-breakdown';
import { CHART_COLOR_LIST } from '../../constants/dashboard';
import { useWidgetData } from '../../hooks/use-widget-data';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './CategoryBreakdownChart.module.scss';

interface CategoryBreakdownChartProps {
  filters: DashboardFilters;
}

const CHART_HEIGHT = 300;
const OUTER_RADIUS = 100;
const INNER_RADIUS = 60;

export const CategoryBreakdownChart: FC<CategoryBreakdownChartProps> = ({ filters }) => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);

  const { data, isLoading } = useWidgetData(
    () =>
      fetchCategoryBreakdown({
        currencyCode: filters.currencyCode,
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
        ...(filters.type !== 'ALL' && { type: filters.type }),
      }),
    `breakdown-${filters.currencyCode}-${filters.dateFrom}-${filters.dateTo}-${filters.type}`,
  );

  const breakdownList = data?.breakdown ?? [];

  return (
    <WidgetCard
      title={translations('content.categoryBreakdownTitle')}
      isLoading={isLoading}
      isEmpty={breakdownList.length === EMPTY_LIST_LENGTH}
    >
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <PieChart>
            <Pie
              data={breakdownList}
              dataKey="total"
              nameKey="categoryName"
              cx="50%"
              cy="50%"
              outerRadius={OUTER_RADIUS}
              innerRadius={INNER_RADIUS}
            >
              {breakdownList.map((item, index) => (
                <Cell
                  key={item.categoryId}
                  fill={CHART_COLOR_LIST[index % CHART_COLOR_LIST.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${data?.currencyCode ?? ''} ${value}`, name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
};
