import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { NOT_FOUND_INDEX } from '@track-my-life/shared/src/constants/list';
import { useCallback, useState } from 'react';

const DELETE_COUNT = 1;

const useDialogState = () => {
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

export const useTransactionDialogs = (
  initialTransactionList: TransactionResponseDto[],
  initialTotal: number,
) => {
  const [transactionList, setTransactionList] =
    useState<TransactionResponseDto[]>(initialTransactionList);
  const [currentTotal, setCurrentTotal] = useState(initialTotal);
  const dialogs = useDialogState();

  const handleFormSuccess = useCallback(
    (transaction: TransactionResponseDto) => {
      setTransactionList((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === transaction.id);
        if (existingIndex !== NOT_FOUND_INDEX) {
          const updatedList = [...prev];
          updatedList[existingIndex] = transaction;
          return updatedList;
        }
        return [transaction, ...prev];
      });
      dialogs.handleFormClose();
    },
    [dialogs],
  );

  const handleDeleteSuccess = useCallback(
    (transactionId: string) => {
      setTransactionList((prev) => prev.filter((item) => item.id !== transactionId));
      setCurrentTotal((prev) => prev - DELETE_COUNT);
      dialogs.handleDeleteClose();
    },
    [dialogs],
  );

  return {
    transactionList,
    currentTotal,
    ...dialogs,
    handleFormSuccess,
    handleDeleteSuccess,
  };
};
