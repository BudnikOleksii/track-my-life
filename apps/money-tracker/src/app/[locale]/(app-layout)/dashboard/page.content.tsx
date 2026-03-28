'use client';

import type { FC } from 'react';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { CategoryBreakdownChart } from './components/category-breakdown-chart/CategoryBreakdownChart';
import { DailySpendingChart } from './components/daily-spending-chart/DailySpendingChart';
import { DashboardFilterBar } from './components/dashboard-filter-bar/DashboardFilterBar';
import { RecentTransactionList } from './components/recent-transaction-list/RecentTransactionList';
import { SummaryWidget } from './components/summary-widget/SummaryWidget';
import { TopCategoryList } from './components/top-category-list/TopCategoryList';
import { TrendsChart } from './components/trends-chart/TrendsChart';
import { useDashboardFilters } from './hooks/use-dashboard-filters';
import styles from './page.module.scss';

export const DashboardPageContent: FC = () => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);
  const { filters, handleFilterChange } = useDashboardFilters();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="title-s">{translations('content.title')}</Typography>
      </div>
      <DashboardFilterBar filters={filters} onFilterChange={handleFilterChange} />
      <div className={styles.grid}>
        <SummaryWidget filters={filters} className={styles.summary} />
        <CategoryBreakdownChart filters={filters} />
        <TrendsChart filters={filters} />
        <TopCategoryList filters={filters} />
        <DailySpendingChart filters={filters} />
        <RecentTransactionList filters={filters} />
      </div>
    </div>
  );
};
