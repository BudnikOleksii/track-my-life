import type { Metadata } from 'next';

import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../components/page-skeleton/PageSkeleton';
import { CategoryListServer } from './components/category-list-server/CategoryListServer';
import styles from './page.module.scss';

interface Props {
  params: Promise<{
    locale: string;
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
    title: translations('metadata.title'),
  };
};

const categoryListSkeletonFallback = <PageSkeleton count={5} height={56} />;

const TransactionsByCategoryPage = async (props: Props) => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.transactionsByCategoryPage,
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="title-l">{translations('content.title')}</Typography>
      </div>
      <Suspense fallback={categoryListSkeletonFallback}>
        <CategoryListServer />
      </Suspense>
    </div>
  );
};

export default TransactionsByCategoryPage;
