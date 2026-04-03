import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../../components/page-skeleton/PageSkeleton';
import { TransactionsByCategoryServer } from './components/transactions-by-category-server/TransactionsByCategoryServer';

interface Props {
  params: Promise<{
    locale: string;
    categoryId: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.transactionsByCategoryPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.detailTitle'),
  };
};

const detailSkeletonFallback = <PageSkeleton count={6} height={56} />;

const TransactionsByCategoryDetailPage = async (props: Props) => {
  const params = await props.params;

  return (
    <Suspense fallback={detailSkeletonFallback}>
      <TransactionsByCategoryServer categoryId={params.categoryId} />
    </Suspense>
  );
};

export default TransactionsByCategoryDetailPage;
