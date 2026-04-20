'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { useMemo, useState } from 'react';

import { CategoryTree } from '../category-tree/CategoryTree';
import { DeleteCategoryDialog } from '../delete-category-dialog/DeleteCategoryDialog';

interface CategoryListClientProps {
  categoryList: CategoryResponseDto[];
}

export const CategoryListClient: FC<CategoryListClientProps> = ({ categoryList }) => {
  const [deletingCategory, setDeletingCategory] = useState<CategoryResponseDto | null>(null);

  const deletingSubcategoryList = useMemo(() => {
    if (!deletingCategory) {
      return [];
    }
    return categoryList.filter((item) => item.parentCategoryId === deletingCategory.id);
  }, [categoryList, deletingCategory]);

  const handleClose = () => {
    setDeletingCategory(null);
  };

  return (
    <>
      <CategoryTree categoryList={categoryList} onDelete={setDeletingCategory} />
      <DeleteCategoryDialog
        category={deletingCategory}
        subcategoryList={deletingSubcategoryList}
        onClose={handleClose}
        onSuccess={handleClose}
      />
    </>
  );
};
