import type { Metadata } from 'next';

import { Skeleton } from '@track-my-life/ui/src/components/atoms/skeleton/skeleton';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

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

const SKELETON_COUNT = 5;
const SKELETON_HEIGHT = 48;
const skeletonList = Array.from({ length: SKELETON_COUNT }, (_unused, index) => index);

const CategoriesPageSkeleton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
    {skeletonList.map((index) => (
      <Skeleton key={index} width="100%" height={SKELETON_HEIGHT} />
    ))}
  </div>
);

const categoriesSkeletonFallback = <CategoriesPageSkeleton />;

const CategoriesSettingsPage = async () => (
  <Suspense fallback={categoriesSkeletonFallback}>
    <CategoryListServer />
  </Suspense>
);

export default CategoriesSettingsPage;
