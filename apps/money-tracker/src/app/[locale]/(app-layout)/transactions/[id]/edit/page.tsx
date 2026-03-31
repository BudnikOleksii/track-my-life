import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { fetchCategoryList } from '@/actions/fetch-category-list';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../../components/page-skeleton/PageSkeleton';
import { fetchTransaction } from '../../actions/fetch-transaction';
import { TransactionFormPage } from '../../components/transaction-form-page/TransactionFormPage';

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
    namespace: I18N_NAMESPACE.transactionsFormPage,
  });

  return {
    title: translations('metadata.editTitle'),
  };
};

const editTransactionSkeletonFallback = <PageSkeleton count={6} height={48} />;

const EditTransactionContent = async ({ id }: { id: string }) => {
  const [transaction, categoryList] = await Promise.all([
    fetchTransaction(id),
    fetchCategoryList(),
  ]);

  if (!transaction) {
    notFound();
  }

  return <TransactionFormPage transaction={transaction} categoryList={categoryList} />;
};

const EditTransactionPage = async (props: Props) => {
  const params = await props.params;

  return (
    <Suspense fallback={editTransactionSkeletonFallback}>
      <EditTransactionContent id={params.id} />
    </Suspense>
  );
};

export default EditTransactionPage;
