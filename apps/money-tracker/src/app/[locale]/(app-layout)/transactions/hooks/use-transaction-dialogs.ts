import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { useCallback, useState } from 'react';

export const useTransactionDialogs = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<TransactionResponseDto | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<TransactionResponseDto | null>(
    null,
  );

  const handleCreate = useCallback(() => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((transaction: TransactionResponseDto) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((transaction: TransactionResponseDto) => {
    setDeletingTransaction(transaction);
  }, []);

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  }, []);

  const handleDeleteClose = useCallback(() => {
    setDeletingTransaction(null);
  }, []);

  return {
    isFormOpen,
    editingTransaction,
    deletingTransaction,
    handleCreate,
    handleEdit,
    handleDelete,
    handleFormClose,
    handleDeleteClose,
  };
};
