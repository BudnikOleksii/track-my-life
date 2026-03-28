'use client';

import type {
  CurrencyCode,
  TopCategoriesResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { CHART_COLOR_LIST } from '../../constants/dashboard';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './TopCategoryList.module.scss';

interface TopCategoryListProps {
  data: TopCategoriesResponseDto | null;
  currencyCode: CurrencyCode;
}

const formatAmount = (amount: string, currencyCode: string): string => `${currencyCode} ${amount}`;

export const TopCategoryList: FC<TopCategoryListProps> = ({ data, currencyCode }) => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);

  const categoryList = data?.categories ?? [];

  return (
    <WidgetCard
      title={translations('content.topCategoriesTitle')}
      isLoading={false}
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
                {formatAmount(category.total, data?.currencyCode ?? currencyCode)}
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
