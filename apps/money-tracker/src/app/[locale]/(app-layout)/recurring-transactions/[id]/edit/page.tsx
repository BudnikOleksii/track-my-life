import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { fetchCategoryList } from '@/actions/fetch-category-list';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../../components/page-skeleton/PageSkeleton';
import { fetchRecurringTransaction } from '../../actions/fetch-recurring-transaction';
import { RecurringTransactionFormPage } from '../../components/recurring-transaction-form-page/RecurringTransactionFormPage';

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
    namespace: I18N_NAMESPACE.recurringTransactionsFormPage,
  });

  return {
    title: translations('metadata.editTitle'),
  };
};

const editRecurringTransactionSkeletonFallback = <PageSkeleton count={9} height={48} />;

const EditRecurringTransactionContent = async ({ id }: { id: string }) => {
  const [recurringTransaction, categoryList] = await Promise.all([
    fetchRecurringTransaction(id),
    fetchCategoryList(),
  ]);

  if (!recurringTransaction) {
    notFound();
  }

  return (
    <RecurringTransactionFormPage
      recurringTransaction={recurringTransaction}
      categoryList={categoryList}
    />
  );
};

const EditRecurringTransactionPage = async (props: Props) => {
  const params = await props.params;

  return (
    <Suspense fallback={editRecurringTransactionSkeletonFallback}>
      <EditRecurringTransactionContent id={params.id} />
    </Suspense>
  );
};

export default EditRecurringTransactionPage;
