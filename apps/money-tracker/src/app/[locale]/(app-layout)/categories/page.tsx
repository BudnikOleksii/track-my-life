import type { Metadata } from 'next';

import { Link } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
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
    namespace: I18N_NAMESPACE.categoriesPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const categoriesSkeletonFallback = <PageSkeleton count={5} height={48} />;

const CategoriesSettingsPage = async (props: Props) => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.categoriesPage,
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="title-l">{translations('content.title')}</Typography>
        <Button component={Link} href={PATHS.categoriesCreate} size="sm">
          <Plus size={16} />
          {translations('content.createButton')}
        </Button>
      </div>
      <Suspense fallback={categoriesSkeletonFallback}>
        <CategoryListServer />
      </Suspense>
    </div>
  );
};

export default CategoriesSettingsPage;
