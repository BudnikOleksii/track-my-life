import type { FC } from 'react';

import { fetchCategoryList } from '@/actions/fetch-category-list';

import { CategoriesPageContent } from '../../page.content';

export const CategoryListServer: FC = async () => {
  const categoryList = await fetchCategoryList();

  return <CategoriesPageContent categoryList={categoryList} />;
};
