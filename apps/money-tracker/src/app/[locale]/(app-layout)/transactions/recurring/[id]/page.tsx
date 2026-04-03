import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../../components/page-skeleton/PageSkeleton';
import { fetchRecurringTransaction } from '../actions/fetch-recurring-transaction';
import { RecurringTransactionDetailContent } from './page.content';

interface Props {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.recurringTransactionsPage,
  });

  return {
    title: translations('content.detailTitle'),
  };
};

const detailSkeletonFallback = <PageSkeleton count={8} height={40} />;

const RecurringTransactionDetailServer = async ({ id }: { id: string }) => {
  const recurringTransaction = await fetchRecurringTransaction(id);

  if (!recurringTransaction) {
    notFound();
  }

  return <RecurringTransactionDetailContent recurringTransaction={recurringTransaction} />;
};

const RecurringTransactionDetailPage = async (props: Props) => {
  const params = await props.params;

  return (
    <Suspense fallback={detailSkeletonFallback}>
      <RecurringTransactionDetailServer id={params.id} />
    </Suspense>
  );
};

export default RecurringTransactionDetailPage;
