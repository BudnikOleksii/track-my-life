import type { FC } from 'react';

import type { FilterValue } from '@/constants/transaction';

import { fetchCategoryList } from '@/actions/fetch-category-list';

import { CategoryListClient } from '../category-list-client/CategoryListClient';

interface CategoryListServerProps {
  type: FilterValue;
}

export const CategoryListServer: FC<CategoryListServerProps> = async ({ type }) => {
  const categoryList = await fetchCategoryList(type === 'ALL' ? undefined : type);

  return <CategoryListClient categoryList={categoryList} />;
};
