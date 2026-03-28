import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { useCallback, useState } from 'react';

export const useCategoryDialogs = () => {
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
