import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { fetchCategoryList } from '@/actions/fetch-category-list';
import { fetchProfile } from '@/actions/fetch-profile';
import { normalizeParam } from '@/constants/normalize-param';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../components/page-skeleton/PageSkeleton';
import { fetchTransaction } from '../actions/fetch-transaction';
import { TransactionFormPage } from '../components/transaction-form-page/TransactionFormPage';

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
    namespace: I18N_NAMESPACE.transactionsFormPage,
  });

  return {
    title: translations('metadata.createTitle'),
  };
};

const createTransactionSkeletonFallback = <PageSkeleton count={6} height={48} />;

const CreateTransactionContent = async ({ copyFrom }: { copyFrom: string }) => {
  const [categoryList, profile, sourceTransaction] = await Promise.all([
    fetchCategoryList(),
    fetchProfile(),
    copyFrom ? fetchTransaction(copyFrom) : Promise.resolve(null),
  ]);

  return (
    <TransactionFormPage
      transaction={null}
      sourceTransaction={sourceTransaction}
      categoryList={categoryList}
      baseCurrencyCode={profile?.baseCurrencyCode ?? null}
    />
  );
};

const CreateTransactionPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const copyFrom = normalizeParam(searchParams.copyFrom);

  return (
    <Suspense key={copyFrom} fallback={createTransactionSkeletonFallback}>
      <CreateTransactionContent copyFrom={copyFrom} />
    </Suspense>
  );
};

export default CreateTransactionPage;
