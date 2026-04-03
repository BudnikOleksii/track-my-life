import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { fetchCategoryList } from '@/actions/fetch-category-list';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../../components/page-skeleton/PageSkeleton';
import { RecurringTransactionFormPage } from '../components/recurring-transaction-form-page/RecurringTransactionFormPage';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.recurringTransactionsFormPage,
  });

  return {
    title: translations('metadata.createTitle'),
  };
};

const createRecurringTransactionSkeletonFallback = <PageSkeleton count={9} height={48} />;

const CreateRecurringTransactionContent = async () => {
  const categoryList = await fetchCategoryList();

  return <RecurringTransactionFormPage recurringTransaction={null} categoryList={categoryList} />;
};

const CreateRecurringTransactionPage = async () => (
  <Suspense fallback={createRecurringTransactionSkeletonFallback}>
    <CreateRecurringTransactionContent />
  </Suspense>
);

export default CreateRecurringTransactionPage;
