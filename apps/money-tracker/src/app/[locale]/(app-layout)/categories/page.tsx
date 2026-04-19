import type { Metadata } from 'next';

import { Link } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Plus } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { redirectIfNotOnboarded } from '@/actions/redirect-if-not-onboarded';
import { FILTER_TO_LABEL_KEY } from '@/constants/filter';
import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
import { CategoryListServer } from './components/category-list-server/CategoryListServer';
import { CategoryTypeFilter } from './components/category-type-filter/CategoryTypeFilter';
import { parseCategorySearchParams } from './constants/categories';
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
    namespace: I18N_NAMESPACE.categoriesPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const categoriesSkeletonFallback = <PageSkeleton count={5} height={48} />;

const CategoriesSettingsPage = async (props: Props) => {
  await redirectIfNotOnboarded();
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
  setRequestLocale(params.locale);
  const filters = parseCategorySearchParams(searchParams);

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.categoriesPage,
  });

  const labelMap = {
    ALL: translations(FILTER_TO_LABEL_KEY.ALL),
    INCOME: translations(FILTER_TO_LABEL_KEY.INCOME),
    EXPENSE: translations(FILTER_TO_LABEL_KEY.EXPENSE),
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="title-l">{translations('content.title')}</Typography>
        <Button component={Link} href={PATHS.categoriesCreate} size="sm">
          <Plus size={16} />
          {translations('content.createButton')}
        </Button>
      </div>
      <CategoryTypeFilter ariaLabel={translations('content.filterByType')} labelMap={labelMap} />
      <Suspense key={filters.type} fallback={categoriesSkeletonFallback}>
        <CategoryListServer type={filters.type} />
      </Suspense>
    </div>
  );
};

export default CategoriesSettingsPage;
