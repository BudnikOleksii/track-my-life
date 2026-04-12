import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { fetchCategoryList } from '@/actions/fetch-category-list';
import { redirectIfNotOnboarded } from '@/actions/redirect-if-not-onboarded';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { PageSkeleton } from '../../components/page-skeleton/PageSkeleton';
import { CategoryFormPage } from '../components/category-form-page/CategoryFormPage';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.categoriesFormPage,
  });

  return {
    title: translations('metadata.createTitle'),
  };
};

const createCategorySkeletonFallback = <PageSkeleton count={3} height={48} />;

const CreateCategoryContent = async () => {
  const categoryList = await fetchCategoryList();
  const parentCategoryList = categoryList.filter((item) => !item.parentCategoryId);

  return <CategoryFormPage category={null} parentCategoryList={parentCategoryList} />;
};

const CreateCategoryPage = async () => {
  await redirectIfNotOnboarded();

  return (
    <Suspense fallback={createCategorySkeletonFallback}>
      <CreateCategoryContent />
    </Suspense>
  );
};

export default CreateCategoryPage;
