import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { NOT_FOUND_INDEX } from '@track-my-life/shared/src/constants/list';
import { useCallback, useEffect, useState } from 'react';

import type { FilterValue } from '@/constants/transaction';

import { fetchTransactionList } from '../actions/fetch-transaction-list';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constants/transaction-list';

export type { FilterValue };

const INITIAL_TOTAL = 0;
const DELETE_COUNT = 1;

interface TransactionFilters {
  page: number;
  pageSize: number;
  type: FilterValue;
  dateFrom: string;
  dateTo: string;
}

const useTransactionDialogs = () => {
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

export const useTransactionManagement = () => {
  const [transactionList, setTransactionList] = useState<TransactionResponseDto[]>([]);
  const [total, setTotal] = useState(INITIAL_TOTAL);
  const [filters, setFilters] = useState<TransactionFilters>({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    type: 'ALL',
    dateFrom: '',
    dateTo: '',
  });
  const dialogs = useTransactionDialogs();

  const loadTransactionList = useCallback(async (currentFilters: TransactionFilters) => {
    const params = {
      page: currentFilters.page,
      pageSize: currentFilters.pageSize,
      ...(currentFilters.type !== 'ALL' && { type: currentFilters.type }),
      ...(currentFilters.dateFrom && { dateFrom: currentFilters.dateFrom }),
      ...(currentFilters.dateTo && { dateTo: currentFilters.dateTo }),
    };

    const result = await fetchTransactionList(params);

    if (result) {
      setTransactionList(result.data);
      setTotal(result.total);
    }
  }, []);

  useEffect(() => {
    loadTransactionList(filters);
  }, [filters, loadTransactionList]);

  const handleFilterChange = useCallback((update: Partial<TransactionFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...update,
      ...(update.type !== undefined || update.dateFrom !== undefined || update.dateTo !== undefined
        ? { page: DEFAULT_PAGE }
        : {}),
    }));
  }, []);

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
      setTotal((prev) => prev - DELETE_COUNT);
      dialogs.handleDeleteClose();
    },
    [dialogs],
  );

  return {
    transactionList,
    total,
    filters,
    ...dialogs,
    handleFilterChange,
    handleFormSuccess,
    handleDeleteSuccess,
  };
};
