'use client';

import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { DashboardFilters } from '../../hooks/use-dashboard-filters';

import { fetchTopCategoryList } from '../../actions/fetch-top-category-list';
import { CHART_COLOR_LIST, TOP_CATEGORY_LIST_LIMIT } from '../../constants/dashboard';
import { useWidgetData } from '../../hooks/use-widget-data';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './TopCategoryList.module.scss';

interface TopCategoryListProps {
  filters: DashboardFilters;
}

const formatAmount = (amount: string, currencyCode: string): string => `${currencyCode} ${amount}`;

export const TopCategoryList: FC<TopCategoryListProps> = ({ filters }) => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);

  const { data, isLoading } = useWidgetData(
    () =>
      fetchTopCategoryList({
        currencyCode: filters.currencyCode,
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
        ...(filters.type !== 'ALL' && { type: filters.type }),
        limit: TOP_CATEGORY_LIST_LIMIT,
      }),
    `top-categories-${filters.currencyCode}-${filters.dateFrom}-${filters.dateTo}-${filters.type}`,
  );

  const categoryList = data?.categories ?? [];

  return (
    <WidgetCard
      title={translations('content.topCategoriesTitle')}
      isLoading={isLoading}
      isEmpty={categoryList.length === EMPTY_LIST_LENGTH}
    >
      <div className={styles.list}>
        {categoryList.map((category, index) => (
          <div key={category.categoryId} className={styles.item}>
            <div className={styles.header}>
              <Typography variant="body-m" className={styles.name}>
                <span className={styles.rank}>{category.rank}</span>
                {category.categoryName}
              </Typography>
              <Typography variant="body-s">
                {formatAmount(category.total, data?.currencyCode ?? filters.currencyCode)}
              </Typography>
            </div>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{
                  width: `${category.percentage}%`,
                  backgroundColor: CHART_COLOR_LIST[index % CHART_COLOR_LIST.length],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};
