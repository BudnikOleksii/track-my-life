import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { redirectIfNotOnboarded } from '@/actions/redirect-if-not-onboarded';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { ImportTransactionPage } from './components/import-transaction-page/ImportTransactionPage';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.transactionsImportPage,
  });

  return {
    title: translations('metadata.title'),
  };
};

const ImportTransactionsPage = async () => {
  await redirectIfNotOnboarded();

  return <ImportTransactionPage />;
};

export default ImportTransactionsPage;
