'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { useMemo, useState } from 'react';

import { CategoryTree } from './components/category-tree/CategoryTree';
import { CategoryTypeFilter } from './components/category-type-filter/CategoryTypeFilter';
import { DeleteCategoryDialog } from './components/delete-category-dialog/DeleteCategoryDialog';
import { useCategoryFilters } from './hooks/use-category-filters';

interface CategoriesPageContentProps {
  categoryList: CategoryResponseDto[];
}

export const CategoriesPageContent: FC<CategoriesPageContentProps> = ({ categoryList }) => {
  const { activeFilter, handleFilterChange } = useCategoryFilters();
  const [deletingCategory, setDeletingCategory] = useState<CategoryResponseDto | null>(null);

  const filteredCategoryList = useMemo(
    () =>
      activeFilter === 'ALL'
        ? categoryList
        : categoryList.filter((item) => item.type === activeFilter),
    [activeFilter, categoryList],
  );

  return (
    <>
      <CategoryTypeFilter value={activeFilter} onValueChange={handleFilterChange} />

      <CategoryTree categoryList={filteredCategoryList} onDelete={setDeletingCategory} />

      <DeleteCategoryDialog
        category={deletingCategory}
        onClose={() => {
          setDeletingCategory(null);
        }}
        onSuccess={() => {
          setDeletingCategory(null);
        }}
      />
    </>
  );
};
