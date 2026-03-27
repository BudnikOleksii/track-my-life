import { useCallback, useEffect, useState } from 'react';

import type { CategoryResponseDto } from '../actions/fetch-category-list';

import { fetchCategoryList } from '../actions/fetch-category-list';

const NOT_FOUND_INDEX = -1;

const useCategoryDialogs = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryResponseDto | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<CategoryResponseDto | null>(null);

  const handleCreate = useCallback(() => {
    setEditingCategory(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((category: CategoryResponseDto) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((category: CategoryResponseDto) => {
    setDeletingCategory(category);
  }, []);

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
    setEditingCategory(null);
  }, []);

  const handleDeleteClose = useCallback(() => {
    setDeletingCategory(null);
  }, []);

  return {
    isFormOpen,
    editingCategory,
    deletingCategory,
    handleCreate,
    handleEdit,
    handleDelete,
    handleFormClose,
    handleDeleteClose,
  };
};

export const useCategoryManagement = () => {
  const [categoryList, setCategoryList] = useState<CategoryResponseDto[]>([]);
  const dialogs = useCategoryDialogs();

  useEffect(() => {
    fetchCategoryList().then(setCategoryList);
  }, []);

  const handleFormSuccess = useCallback(
    (category: CategoryResponseDto) => {
      setCategoryList((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === category.id);
        if (existingIndex !== NOT_FOUND_INDEX) {
          const updatedList = [...prev];
          updatedList[existingIndex] = category;
          return updatedList;
        }
        return [...prev, category];
      });
      dialogs.handleFormClose();
    },
    [dialogs],
  );

  const handleDeleteSuccess = useCallback(
    (categoryId: string) => {
      setCategoryList((prev) => prev.filter((item) => item.id !== categoryId));
      dialogs.handleDeleteClose();
    },
    [dialogs],
  );

  return {
    categoryList,
    ...dialogs,
    handleFormSuccess,
    handleDeleteSuccess,
  };
};
