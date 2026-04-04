import type { Metadata } from 'next';

import { Link } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { ArrowLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../../components/page-skeleton/PageSkeleton';
import { ExportTransactionButton } from '../../components/export-transaction-button/ExportTransactionButton';
import { TransactionsByCategoryServer } from './components/transactions-by-category-server/TransactionsByCategoryServer';
import styles from './page.module.scss';

interface Props {
  params: Promise<{
    locale: string;
    categoryId: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.transactionsByCategoryPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.detailTitle'),
  };
};

const detailSkeletonFallback = <PageSkeleton count={6} height={56} />;

const TransactionsByCategoryDetailPage = async (props: Props) => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.transactionsByCategoryPage,
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href={PATHS.transactionsByCategory} className={styles.backLink}>
          <ArrowLeft size={18} />
          <Typography variant="body-m" fontWeight="medium" tag="span">
            {translations('content.backToCategories')}
          </Typography>
        </Link>
        <ExportTransactionButton
          categoryId={params.categoryId}
          exportLabel={translations('content.exportButton')}
          downloadCsvLabel={translations('content.downloadCsv')}
          downloadJsonLabel={translations('content.downloadJson')}
          errorLabel={translations('content.exportError')}
        />
      </div>
      <Suspense fallback={detailSkeletonFallback}>
        <TransactionsByCategoryServer categoryId={params.categoryId} />
      </Suspense>
    </div>
  );
};

export default TransactionsByCategoryDetailPage;
