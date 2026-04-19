'use client';

import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { createContext, useContext } from 'react';

interface TransactionRowDispatchContextValue {
  isBulkDeleteSubmitting: boolean;
  onToggleSelection: (id: string) => void;
  onRequestDelete: (transaction: TransactionResponseDto) => void;
}

interface TransactionRowSelectionContextValue {
  selectedIdSet: ReadonlySet<string>;
}

export const TransactionRowDispatchContext =
  createContext<TransactionRowDispatchContextValue | null>(null);

export const TransactionRowSelectionContext =
  createContext<TransactionRowSelectionContextValue | null>(null);

export const useTransactionRowDispatchContext = (): TransactionRowDispatchContextValue => {
  const value = useContext(TransactionRowDispatchContext);
  if (!value) {
    throw new Error('useTransactionRowDispatchContext must be used within TransactionsPageContent');
  }
  return value;
};

export const useTransactionRowSelectionContext = (): TransactionRowSelectionContextValue => {
  const value = useContext(TransactionRowSelectionContext);
  if (!value) {
    throw new Error(
      'useTransactionRowSelectionContext must be used within TransactionsPageContent',
    );
  }
  return value;
};
