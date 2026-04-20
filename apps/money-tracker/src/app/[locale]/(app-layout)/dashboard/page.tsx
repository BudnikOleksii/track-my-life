import type { Metadata } from 'next';

import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { redirectIfNotOnboarded } from '@/actions/redirect-if-not-onboarded';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { CategoryBreakdownChart } from './components/category-breakdown-chart/CategoryBreakdownChart';
import { DailySpendingChart } from './components/daily-spending-chart/DailySpendingChart';
import { DashboardFilterBar } from './components/dashboard-filter-bar/DashboardFilterBar';
import { RecentTransactionList } from './components/recent-transaction-list/RecentTransactionList';
import { SummaryWidget } from './components/summary-widget/SummaryWidget';
import { TopCategoryList } from './components/top-category-list/TopCategoryList';
import { TrendsChart } from './components/trends-chart/TrendsChart';
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
  <div className={styles.widgetSkeleton}>
    {skeletonList.map((index) => (
      <Skeleton key={index} width="100%" height={SKELETON_HEIGHT} />
    ))}
  </div>
);

const widgetSkeletonFallback = <WidgetSkeleton />;

const DashboardPage = async (props: Props) => {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
  setRequestLocale(params.locale);
  await redirectIfNotOnboarded();

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
      <DashboardFilterBar filters={filters} />
      <div className={styles.grid}>
        <Suspense key={`summary-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <SummaryWidget filters={filters} className={styles.summary} />
        </Suspense>
        <Suspense key={`breakdown-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <CategoryBreakdownChart filters={filters} />
        </Suspense>
        <Suspense key={`trends-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <TrendsChart filters={filters} />
        </Suspense>
        <Suspense key={`top-categories-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <TopCategoryList filters={filters} />
        </Suspense>
        <Suspense key={`daily-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <DailySpendingChart filters={filters} />
        </Suspense>
        <Suspense key={`recent-${filtersKey}`} fallback={widgetSkeletonFallback}>
          <RecentTransactionList filters={filters} />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
