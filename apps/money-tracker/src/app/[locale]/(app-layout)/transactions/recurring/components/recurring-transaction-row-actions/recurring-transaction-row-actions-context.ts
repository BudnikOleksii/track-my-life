'use client';

import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { createContext, useContext } from 'react';

interface RecurringTransactionRowDispatchContextValue {
  isBulkDeleteSubmitting: boolean;
  onToggleSelection: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onRequestDelete: (recurringTransaction: RecurringTransactionResponseDto) => void;
}

interface RecurringTransactionRowSelectionContextValue {
  selectedIdSet: ReadonlySet<string>;
}

interface RecurringTransactionRowPendingContextValue {
  pendingId: string | null;
}

export const RecurringTransactionRowDispatchContext =
  createContext<RecurringTransactionRowDispatchContextValue | null>(null);

export const RecurringTransactionRowSelectionContext =
  createContext<RecurringTransactionRowSelectionContextValue | null>(null);

export const RecurringTransactionRowPendingContext =
  createContext<RecurringTransactionRowPendingContextValue | null>(null);

export const useRecurringTransactionRowDispatchContext =
  (): RecurringTransactionRowDispatchContextValue => {
    const value = useContext(RecurringTransactionRowDispatchContext);
    if (!value) {
      throw new Error(
        'useRecurringTransactionRowDispatchContext must be used within RecurringTransactionsPageContent',
      );
    }
    return value;
  };

export const useRecurringTransactionRowSelectionContext =
  (): RecurringTransactionRowSelectionContextValue => {
    const value = useContext(RecurringTransactionRowSelectionContext);
    if (!value) {
      throw new Error(
        'useRecurringTransactionRowSelectionContext must be used within RecurringTransactionsPageContent',
      );
    }
    return value;
  };

export const useRecurringTransactionRowPendingContext =
  (): RecurringTransactionRowPendingContextValue => {
    const value = useContext(RecurringTransactionRowPendingContext);
    if (!value) {
      throw new Error(
        'useRecurringTransactionRowPendingContext must be used within RecurringTransactionsPageContent',
      );
    }
    return value;
  };
