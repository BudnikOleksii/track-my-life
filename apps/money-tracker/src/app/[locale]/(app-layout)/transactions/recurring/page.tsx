import type { Metadata } from 'next';

import { Link } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../components/page-skeleton/PageSkeleton';
import {
  parseRecurringTransactionSearchParams,
  RecurringTransactionListServer,
} from './components/recurring-transaction-list-server/RecurringTransactionListServer';
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
    namespace: I18N_NAMESPACE.recurringTransactionsPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const recurringTransactionsSkeletonFallback = <PageSkeleton count={8} height={56} />;

const RecurringTransactionsPage = async (props: Props) => {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
  const filters = parseRecurringTransactionSearchParams(searchParams);

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.recurringTransactionsPage,
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="title-l">{translations('content.title')}</Typography>
        <Button component={Link} href={PATHS.recurringTransactionsCreate} size="sm">
          <Plus size={16} />
          {translations('content.createButton')}
        </Button>
      </div>
      <Suspense key={JSON.stringify(filters)} fallback={recurringTransactionsSkeletonFallback}>
        <RecurringTransactionListServer {...filters} />
      </Suspense>
    </div>
  );
};

export default RecurringTransactionsPage;
