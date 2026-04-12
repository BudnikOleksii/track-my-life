import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { convertFilterDateList } from '@track-my-life/shared/src/utils/convert-filter-date-list';
import { formatAmount } from '@track-my-life/shared/src/utils/format-amount';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';
import { getTimezoneOffset } from '@/utils/get-timezone-offset';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchTopCategoryList } from '../../actions/fetch-top-category-list';
import { CHART_COLOR_LIST, TOP_CATEGORY_LIST_LIMIT } from '../../constants/dashboard';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './TopCategoryList.module.scss';

interface TopCategoryListProps {
  filters: DashboardFilters;
}

export const TopCategoryList = async ({ filters }: TopCategoryListProps) => {
  const [translations, offset] = await Promise.all([
    getTranslations(I18N_NAMESPACE.dashboardPage),
    getTimezoneOffset(),
  ]);

  const data = await fetchTopCategoryList({
    currencyCode: filters.currencyCode,
    ...convertFilterDateList(filters, offset),
    ...(filters.type !== 'ALL' && { type: filters.type }),
    limit: TOP_CATEGORY_LIST_LIMIT,
  });

  const categoryList = data?.categories ?? [];

  return (
    <WidgetCard
      title={translations('content.topCategoriesTitle')}
      noDataLabel={translations('content.noData')}
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
                style={
                  {
                    '--bar-width': `${category.percentage}%`,
                    '--bar-color': CHART_COLOR_LIST[index % CHART_COLOR_LIST.length],
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};
