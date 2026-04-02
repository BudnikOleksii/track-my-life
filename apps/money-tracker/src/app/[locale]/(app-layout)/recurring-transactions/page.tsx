import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
import {
  parseRecurringTransactionSearchParams,
  RecurringTransactionListServer,
} from './components/recurring-transaction-list-server/RecurringTransactionListServer';

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
    namespace: I18N_NAMESPACE.recurringTransactionsPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const recurringTransactionsSkeletonFallback = <PageSkeleton count={8} height={56} />;

const RecurringTransactionsPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const filters = parseRecurringTransactionSearchParams(searchParams);

  return (
    <Suspense key={JSON.stringify(filters)} fallback={recurringTransactionsSkeletonFallback}>
      <RecurringTransactionListServer {...filters} />
    </Suspense>
  );
};

export default RecurringTransactionsPage;
