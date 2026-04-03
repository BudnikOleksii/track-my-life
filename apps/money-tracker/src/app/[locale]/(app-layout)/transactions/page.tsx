import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
import { TransactionListServer } from './components/transaction-list-server/TransactionListServer';
import { parseTransactionSearchParams } from './constants/parse-transaction-search-params';

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
    namespace: I18N_NAMESPACE.transactionsPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const transactionsSkeletonFallback = <PageSkeleton count={8} height={56} />;

const TransactionsPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const filters = parseTransactionSearchParams(searchParams);

  return (
    <Suspense key={JSON.stringify(filters)} fallback={transactionsSkeletonFallback}>
      <TransactionListServer {...filters} />
    </Suspense>
  );
};

export default TransactionsPage;
