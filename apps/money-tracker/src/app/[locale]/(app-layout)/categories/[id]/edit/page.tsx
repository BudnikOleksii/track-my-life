import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { fetchCategory } from '@/actions/fetch-category';
import { fetchCategoryList } from '@/actions/fetch-category-list';
import { redirectIfNotOnboarded } from '@/actions/redirect-if-not-onboarded';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../../components/page-skeleton/PageSkeleton';
import { CategoryFormPage } from '../../components/category-form-page/CategoryFormPage';

interface Props {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.categoriesFormPage,
  });

  return {
    title: translations('metadata.editTitle'),
  };
};

const editCategorySkeletonFallback = <PageSkeleton count={3} height={48} />;

const EditCategoryContent = async ({ id }: { id: string }) => {
  const [category, categoryList] = await Promise.all([fetchCategory(id), fetchCategoryList()]);

  if (!category) {
    notFound();
  }

  const parentCategoryList = categoryList.filter((item) => !item.parentCategoryId);

  return <CategoryFormPage category={category} parentCategoryList={parentCategoryList} />;
};

const EditCategoryPage = async (props: Props) => {
  await redirectIfNotOnboarded();
  const params = await props.params;

  return (
    <Suspense fallback={editCategorySkeletonFallback}>
      <EditCategoryContent id={params.id} />
    </Suspense>
  );
};

export default EditCategoryPage;
