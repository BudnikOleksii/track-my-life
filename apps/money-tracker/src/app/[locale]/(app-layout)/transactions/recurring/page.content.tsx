'use client';

import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Pagination } from '@track-my-life/ui/src/components/molecules/pagination/pagination';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useTranslations } from 'next-intl';
import { useCallback, useState, useTransition } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { RecurringTransactionFilterStatus } from './constants/recurring-transaction-list';

import { pauseRecurringTransaction } from './actions/pause-recurring-transaction';
import { resumeRecurringTransaction } from './actions/resume-recurring-transaction';
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
      />

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
    </>
  );
};
