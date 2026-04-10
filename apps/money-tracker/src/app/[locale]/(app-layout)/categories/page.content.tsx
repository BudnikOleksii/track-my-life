'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { TypeFilter } from '@/components/type-filter/TypeFilter';
import { FILTER_TO_LABEL_KEY } from '@/constants/filter';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { CategoryTree } from './components/category-tree/CategoryTree';
import { DeleteCategoryDialog } from './components/delete-category-dialog/DeleteCategoryDialog';
import { useCategoryFilters } from './hooks/use-category-filters';

interface CategoriesPageContentProps {
  categoryList: CategoryResponseDto[];
}

export const CategoriesPageContent: FC<CategoriesPageContentProps> = ({ categoryList }) => {
  const translations = useTranslations(I18N_NAMESPACE.categoriesPage);
  const { activeFilter, handleFilterChange } = useCategoryFilters();
  const [deletingCategory, setDeletingCategory] = useState<CategoryResponseDto | null>(null);

  const filteredCategoryList = useMemo(
    () =>
      activeFilter === 'ALL'
        ? categoryList
        : categoryList.filter((item) => item.type === activeFilter),
    [activeFilter, categoryList],
  );

  const labelMap = useMemo(
    () => ({
      ALL: translations(FILTER_TO_LABEL_KEY.ALL),
      INCOME: translations(FILTER_TO_LABEL_KEY.INCOME),
      EXPENSE: translations(FILTER_TO_LABEL_KEY.EXPENSE),
    }),
    [translations],
  );

  return (
    <>
      <TypeFilter
        value={activeFilter}
        onValueChange={handleFilterChange}
        ariaLabel={translations('content.filterByType')}
        labelMap={labelMap}
      />

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
