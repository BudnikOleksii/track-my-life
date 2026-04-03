import type { FC } from 'react';

import { fetchCategoryList } from '@/actions/fetch-category-list';

import { TransactionsByCategoryPageContent } from '../../page.content';

export const CategoryListServer: FC = async () => {
  const categoryList = await fetchCategoryList();
  const topLevelCategoryList = categoryList.filter(
    (category) => category.parentCategoryId === null,
  );

  return <TransactionsByCategoryPageContent categoryList={topLevelCategoryList} />;
};
