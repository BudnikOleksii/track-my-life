'use client';

import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC, ReactNode } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Pagination } from '@track-my-life/ui/src/components/molecules/pagination/pagination';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { BulkDeleteActionBar } from '@/components/bulk-delete-action-bar/BulkDeleteActionBar';
import { useBulkDeleteSelection } from '@/hooks/use-bulk-delete-selection';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { RecurringTransactionFilterStatus } from './constants/recurring-transaction-list';

import { BulkDeleteRecurringTransactionDialog } from './components/bulk-delete-recurring-transaction-dialog/BulkDeleteRecurringTransactionDialog';
import { DeleteRecurringTransactionDialog } from './components/delete-recurring-transaction-dialog/DeleteRecurringTransactionDialog';
import {
  RecurringTransactionRowDispatchContext,
  RecurringTransactionRowPendingContext,
  RecurringTransactionRowSelectionContext,
} from './components/recurring-transaction-row-actions/recurring-transaction-row-actions-context';
import { RecurringTransactionStatusFilter } from './components/recurring-transaction-status-filter/RecurringTransactionStatusFilter';
import { useRecurringTransactionFilters } from './hooks/use-recurring-transaction-filters';
import { useRecurringTransactionPendingActions } from './hooks/use-recurring-transaction-pending-actions';
import styles from './page.module.scss';

interface RecurringTransactionFilters {
  page: number;
  pageSize: number;
  status: RecurringTransactionFilterStatus;
}

interface RecurringTransactionsPageContentProps {
  total: number;
  filters: RecurringTransactionFilters;
  visibleIdList: string[];
  children: ReactNode;
}

export const RecurringTransactionsPageContent: FC<RecurringTransactionsPageContentProps> = ({
  total,
  filters,
  visibleIdList,
  children,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.recurringTransactionsPage);
  const { handleFilterChange } = useRecurringTransactionFilters();
  const [deletingTransaction, setDeletingTransaction] =
    useState<RecurringTransactionResponseDto | null>(null);
  const { pendingId, handlePause, handleResume } = useRecurringTransactionPendingActions({
    translations,
  });

  const {
    selectedIdSet,
    setSelectedIdSet,
    bulkDeleteIdList,
    isBulkDeleteSubmitting,
    setIsBulkDeleteSubmitting,
    areAllVisibleSelected,
    handleToggleSelection,
    handleClearSelection,
    handleSelectAllVisible,
    handleBulkDeleteOpen,
    handleBulkDeleteClose,
  } = useBulkDeleteSelection({ visibleIdList, translations });

  const dispatchContextValue = useMemo(
    () => ({
      isBulkDeleteSubmitting,
      onToggleSelection: handleToggleSelection,
      onPause: handlePause,
      onResume: handleResume,
      onRequestDelete: setDeletingTransaction,
    }),
    [
      isBulkDeleteSubmitting,
      handleToggleSelection,
      handlePause,
      handleResume,
      setDeletingTransaction,
    ],
  );

  const selectionContextValue = useMemo(() => ({ selectedIdSet }), [selectedIdSet]);

  const pendingContextValue = useMemo(() => ({ pendingId }), [pendingId]);

  return (
    <>
      <div className={styles.filters}>
        <RecurringTransactionStatusFilter
          value={filters.status}
          onValueChange={(status) => {
            handleFilterChange({ status });
          }}
        />
      </div>

      <RecurringTransactionRowDispatchContext.Provider value={dispatchContextValue}>
        <RecurringTransactionRowPendingContext.Provider value={pendingContextValue}>
          <RecurringTransactionRowSelectionContext.Provider value={selectionContextValue}>
            {children}
          </RecurringTransactionRowSelectionContext.Provider>
        </RecurringTransactionRowPendingContext.Provider>
      </RecurringTransactionRowDispatchContext.Provider>

      {selectedIdSet.size > EMPTY_LIST_LENGTH && (
        <BulkDeleteActionBar
          selectedCount={selectedIdSet.size}
          selectedCountLabel={translations('content.bulkDelete.selectedCount', {
            count: selectedIdSet.size,
          })}
          deleteLabel={translations('content.bulkDelete.deleteSelected')}
          clearLabel={translations('content.bulkDelete.clearSelection')}
          selectAllLabel={translations(
            areAllVisibleSelected
              ? 'content.bulkDelete.deselectAllVisible'
              : 'content.bulkDelete.selectAllVisible',
          )}
          onDelete={handleBulkDeleteOpen}
          onClear={handleClearSelection}
          onSelectAllVisible={handleSelectAllVisible}
          isSubmitting={isBulkDeleteSubmitting}
          areAllVisibleSelected={areAllVisibleSelected}
        />
      )}

      <Pagination
        page={filters.page}
        pageSize={filters.pageSize}
        total={total}
        onPageChange={(page) => {
          handleFilterChange({ page });
        }}
        previousLabel={translations('content.previousPage')}
        nextLabel={translations('content.nextPage')}
        renderInfo={(currentPage, totalPages) =>
          translations('content.pageInfo', { page: currentPage, total: totalPages })
        }
      />

      <DeleteRecurringTransactionDialog
        recurringTransaction={deletingTransaction}
        onClose={() => {
          setDeletingTransaction(null);
        }}
        onSuccess={() => {
          setDeletingTransaction(null);
        }}
      />

      <BulkDeleteRecurringTransactionDialog
        idList={bulkDeleteIdList}
        onClose={handleBulkDeleteClose}
        onSubmittingChange={setIsBulkDeleteSubmitting}
        setSelectedIdSet={setSelectedIdSet}
      />
    </>
  );
};
