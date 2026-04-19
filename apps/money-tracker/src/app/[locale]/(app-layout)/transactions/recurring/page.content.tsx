'use client';

import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Pagination } from '@track-my-life/ui/src/components/molecules/pagination/pagination';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState, useTransition } from 'react';

import { BulkDeleteActionBar } from '@/components/bulk-delete-action-bar/BulkDeleteActionBar';
import { useBulkDeleteSelection } from '@/hooks/use-bulk-delete-selection';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { RecurringTransactionFilterStatus } from './constants/recurring-transaction-list';

import { pauseRecurringTransaction } from './actions/pause-recurring-transaction';
import { resumeRecurringTransaction } from './actions/resume-recurring-transaction';
import { BulkDeleteRecurringTransactionDialog } from './components/bulk-delete-recurring-transaction-dialog/BulkDeleteRecurringTransactionDialog';
import { DeleteRecurringTransactionDialog } from './components/delete-recurring-transaction-dialog/DeleteRecurringTransactionDialog';
import { RecurringTransactionList } from './components/recurring-transaction-list/RecurringTransactionList';
import { RecurringTransactionStatusFilter } from './components/recurring-transaction-status-filter/RecurringTransactionStatusFilter';
import { useRecurringTransactionFilters } from './hooks/use-recurring-transaction-filters';
import styles from './page.module.scss';

interface RecurringTransactionFilters {
  page: number;
  pageSize: number;
  status: RecurringTransactionFilterStatus;
}

interface RecurringTransactionsPageContentProps {
  recurringTransactionList: RecurringTransactionResponseDto[];
  total: number;
  filters: RecurringTransactionFilters;
}

export const RecurringTransactionsPageContent: FC<RecurringTransactionsPageContentProps> = ({
  recurringTransactionList,
  total,
  filters,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.recurringTransactionsPage);
  const { handleFilterChange } = useRecurringTransactionFilters();
  const [deletingTransaction, setDeletingTransaction] =
    useState<RecurringTransactionResponseDto | null>(null);
  const [isPending, startTransition] = useTransition();

  const visibleIdList = useMemo(
    () => recurringTransactionList.map((item) => item.id),
    [recurringTransactionList],
  );

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

  const handlePause = useCallback(
    (id: string) => {
      startTransition(async () => {
        const result = await pauseRecurringTransaction(id);
        if (!result.ok) {
          toast.error(translations('content.pauseError'));
        }
      });
    },
    [translations],
  );

  const handleResume = useCallback(
    (id: string) => {
      startTransition(async () => {
        const result = await resumeRecurringTransaction(id);
        if (!result.ok) {
          toast.error(translations('content.resumeError'));
        }
      });
    },
    [translations],
  );

  const selectedCount = selectedIdSet.size;

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

      <RecurringTransactionList
        recurringTransactionList={recurringTransactionList}
        isPending={isPending}
        onDelete={setDeletingTransaction}
        onPause={handlePause}
        onResume={handleResume}
        selectedIdSet={selectedIdSet}
        onToggleSelection={handleToggleSelection}
        isBulkDeleteSubmitting={isBulkDeleteSubmitting}
      />

      {selectedCount > EMPTY_LIST_LENGTH && (
        <BulkDeleteActionBar
          selectedCount={selectedCount}
          selectedCountLabel={translations('content.bulkDelete.selectedCount', {
            count: selectedCount,
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
