import type { Metadata } from 'next';

import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { CategoryBreakdownChartServer } from './components/category-breakdown-chart/CategoryBreakdownChartServer';
import { DailySpendingChartServer } from './components/daily-spending-chart/DailySpendingChartServer';
import { DashboardFilterBarClient } from './components/dashboard-filter-bar/DashboardFilterBarClient';
import { RecentTransactionListServer } from './components/recent-transaction-list/RecentTransactionListServer';
import { SummaryWidgetServer } from './components/summary-widget/SummaryWidgetServer';
import { TopCategoryListServer } from './components/top-category-list/TopCategoryListServer';
import { TrendsChartServer } from './components/trends-chart/TrendsChartServer';
import { parseDashboardSearchParams } from './constants/dashboard';
import styles from './page.module.scss';

interface Props {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.dashboardPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const SKELETON_COUNT = 3;
const SKELETON_HEIGHT = 20;
const skeletonList = Array.from({ length: SKELETON_COUNT }, (_unused, index) => index);

const WidgetSkeleton = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-2)',
      padding: 'var(--spacing-4)',
    }}
  >
    {skeletonList.map((index) => (
      <Skeleton key={index} width="100%" height={SKELETON_HEIGHT} />
    ))}
  </div>
);

const widgetSkeletonFallback = <WidgetSkeleton />;

const DashboardPage = async (props: Props) => {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
  const filters = parseDashboardSearchParams(searchParams);

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.dashboardPage,
  });

  const filtersKey = JSON.stringify(filters);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="title-s">{translations('content.title')}</Typography>
      </div>
      <DashboardFilterBarClient filters={filters} />
      <div className={styles.grid}>
        <Suspense key={`summary-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <SummaryWidgetServer filters={filters} className={styles.summary} />
        </Suspense>
        <Suspense key={`breakdown-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <CategoryBreakdownChartServer filters={filters} />
        </Suspense>
        <Suspense key={`trends-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <TrendsChartServer filters={filters} />
        </Suspense>
        <Suspense key={`top-categories-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <TopCategoryListServer filters={filters} />
        </Suspense>
        <Suspense key={`daily-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <DailySpendingChartServer filters={filters} />
        </Suspense>
        <Suspense key={`recent-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <RecentTransactionListServer filters={filters} />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
