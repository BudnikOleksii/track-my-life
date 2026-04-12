import type { Metadata } from 'next';

import { Link } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { redirectIfNotOnboarded } from '@/actions/redirect-if-not-onboarded';
import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
import { ExportTransactionButton } from './components/export-transaction-button/ExportTransactionButton';
import { TransactionListServer } from './components/transaction-list-server/TransactionListServer';
import { parseTransactionSearchParams } from './constants/parse-transaction-search-params';
import styles from './page.module.scss';

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
    namespace: I18N_NAMESPACE.transactionsPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const transactionsSkeletonFallback = <PageSkeleton count={8} height={56} />;

const TransactionsPage = async (props: Props) => {
  await redirectIfNotOnboarded();
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
  const filters = parseTransactionSearchParams(searchParams);

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.transactionsPage,
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="title-l">{translations('content.title')}</Typography>
        <div className={styles.actionList}>
          <ExportTransactionButton
            exportLabel={translations('content.exportAllButton')}
            downloadCsvLabel={translations('content.downloadCsv')}
            downloadJsonLabel={translations('content.downloadJson')}
            errorLabel={translations('content.exportError')}
          />
          <ExportTransactionButton
            dateFrom={filters.dateFrom}
            dateTo={filters.dateTo}
            exportLabel={translations('content.exportButton')}
            downloadCsvLabel={translations('content.downloadCsv')}
            downloadJsonLabel={translations('content.downloadJson')}
            errorLabel={translations('content.exportError')}
          />
          <Button
            component={Link}
            href={PATHS.transactionsCreate}
            size="sm"
            aria-label={translations('content.createButton')}
          >
            <Plus size={16} />
            <span className={styles.buttonLabel}>{translations('content.createButton')}</span>
          </Button>
        </div>
      </div>
      <Suspense key={JSON.stringify(filters)} fallback={transactionsSkeletonFallback}>
        <TransactionListServer {...filters} />
      </Suspense>
    </div>
  );
};

export default TransactionsPage;
