import type { Metadata } from 'next';

import { Link } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
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
        <Button component={Link} href={PATHS.transactionsCreate} size="sm">
          <Plus size={16} />
          {translations('content.createButton')}
        </Button>
      </div>
      <Suspense key={JSON.stringify(filters)} fallback={transactionsSkeletonFallback}>
        <TransactionListServer {...filters} />
      </Suspense>
    </div>
  );
};

export default TransactionsPage;
