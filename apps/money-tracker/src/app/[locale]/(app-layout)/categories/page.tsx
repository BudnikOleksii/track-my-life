import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../components/page-skeleton/PageSkeleton';
import { CategoryListServer } from './components/category-list-server/CategoryListServer';

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

const CategoriesSettingsPage = async () => (
  <Suspense fallback={categoriesSkeletonFallback}>
    <CategoryListServer />
  </Suspense>
);

export default CategoriesSettingsPage;
