import type { Metadata } from 'next';

import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { redirectIfNotOnboarded } from '@/actions/redirect-if-not-onboarded';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../../components/page-skeleton/PageSkeleton';
import { fetchRecurringTransaction } from '../actions/fetch-recurring-transaction';
import { RecurringTransactionDetailFields } from './components/recurring-transaction-detail-fields/RecurringTransactionDetailFields';
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
  const [recurringTransaction, locale] = await Promise.all([
    fetchRecurringTransaction(id),
    getLocale(),
  ]);

  if (!recurringTransaction) {
    notFound();
  }

  return (
    <RecurringTransactionDetailContent recurringTransaction={recurringTransaction}>
      <RecurringTransactionDetailFields
        recurringTransaction={recurringTransaction}
        locale={locale}
      />
    </RecurringTransactionDetailContent>
  );
};

const RecurringTransactionDetailPage = async (props: Props) => {
  await redirectIfNotOnboarded();
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <Suspense fallback={detailSkeletonFallback}>
      <RecurringTransactionDetailServer id={params.id} />
    </Suspense>
  );
};

export default RecurringTransactionDetailPage;
