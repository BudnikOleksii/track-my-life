'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { FilterValue } from './components/category-type-filter/CategoryTypeFilter';

import { CategoryForm } from './components/category-form/CategoryForm';
import { CategoryTree } from './components/category-tree/CategoryTree';
import { CategoryTypeFilter } from './components/category-type-filter/CategoryTypeFilter';
import { DeleteCategoryDialog } from './components/delete-category-dialog/DeleteCategoryDialog';
import { useCategoryManagement } from './hooks/use-category-management';
import styles from './page.module.scss';

interface CategoriesPageContentProps {
  initialCategoryList: CategoryResponseDto[];
}

export const CategoriesPageContent: FC<CategoriesPageContentProps> = ({ initialCategoryList }) => {
  const translations = useTranslations(I18N_NAMESPACE.categoriesPage);
  const [activeFilter, setActiveFilter] = useState<FilterValue>('ALL');

  const {
    categoryList,
    isFormOpen,
    editingCategory,
    deletingCategory,
    handleCreate,
    handleEdit,
    handleDelete,
    handleFormClose,
    handleDeleteClose,
    handleFormSuccess,
    handleDeleteSuccess,
  } = useCategoryManagement(initialCategoryList);

  const filteredCategoryList = useMemo(
    () =>
      activeFilter === 'ALL'
        ? categoryList
        : categoryList.filter((item) => item.type === activeFilter),
    [activeFilter, categoryList],
  );

  const parentCategoryList = useMemo(
    () => categoryList.filter((item) => !item.parentCategoryId),
    [categoryList],
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="title-l">{translations('content.title')}</Typography>
        <Button onClick={handleCreate} size="sm">
          <Plus size={16} />
          {translations('content.createButton')}
        </Button>
      </div>

      <CategoryTypeFilter value={activeFilter} onValueChange={setActiveFilter} />

      <CategoryTree
        categoryList={filteredCategoryList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryForm
        isOpen={isFormOpen}
        category={editingCategory}
        parentCategoryList={parentCategoryList}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />

      <DeleteCategoryDialog
        category={deletingCategory}
        onClose={handleDeleteClose}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
};
