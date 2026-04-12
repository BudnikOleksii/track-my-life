import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { fetchCategoryList } from '@/actions/fetch-category-list';
import { fetchProfile } from '@/actions/fetch-profile';
import { redirectIfNotOnboarded } from '@/actions/redirect-if-not-onboarded';
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
  const [categoryList, profile] = await Promise.all([fetchCategoryList(), fetchProfile()]);

  return (
    <RecurringTransactionFormPage
      recurringTransaction={null}
      categoryList={categoryList}
      baseCurrencyCode={profile?.baseCurrencyCode ?? null}
    />
  );
};

const CreateRecurringTransactionPage = async () => {
  await redirectIfNotOnboarded();

  return (
    <Suspense fallback={createRecurringTransactionSkeletonFallback}>
      <CreateRecurringTransactionContent />
    </Suspense>
  );
};

export default CreateRecurringTransactionPage;
