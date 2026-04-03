import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { fetchCategoryList } from '@/actions/fetch-category-list';
import { fetchProfile } from '@/actions/fetch-profile';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../components/page-skeleton/PageSkeleton';
import { TransactionFormPage } from '../components/transaction-form-page/TransactionFormPage';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.transactionsFormPage,
  });

  return {
    title: translations('metadata.createTitle'),
  };
};

const createTransactionSkeletonFallback = <PageSkeleton count={6} height={48} />;

const CreateTransactionContent = async () => {
  const [categoryList, profile] = await Promise.all([fetchCategoryList(), fetchProfile()]);

  return (
    <TransactionFormPage
      transaction={null}
      categoryList={categoryList}
      baseCurrencyCode={profile?.baseCurrencyCode ?? null}
    />
  );
};

const CreateTransactionPage = async () => (
  <Suspense fallback={createTransactionSkeletonFallback}>
    <CreateTransactionContent />
  </Suspense>
);

export default CreateTransactionPage;
