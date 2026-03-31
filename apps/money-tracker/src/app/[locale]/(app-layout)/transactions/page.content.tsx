'use client';

import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Link } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Pagination } from '@track-my-life/ui/src/components/molecules/pagination/pagination';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { FilterValue } from '@/constants/transaction';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { DeleteTransactionDialog } from './components/delete-transaction-dialog/DeleteTransactionDialog';
import { TransactionDateFilter } from './components/transaction-date-filter/TransactionDateFilter';
import { TransactionList } from './components/transaction-list/TransactionList';
import { TransactionTypeFilter } from './components/transaction-type-filter/TransactionTypeFilter';
import { useTransactionFilters } from './hooks/use-transaction-filters';
import styles from './page.module.scss';

interface TransactionFilters {
  page: number;
  pageSize: number;
  type: FilterValue;
  dateFrom: string;
  dateTo: string;
}

interface TransactionsPageContentProps {
  transactionList: TransactionResponseDto[];
  total: number;
  filters: TransactionFilters;
}

export const TransactionsPageContent: FC<TransactionsPageContentProps> = ({
  transactionList,
  total,
  filters,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);
  const { handleFilterChange } = useTransactionFilters();
  const [deletingTransaction, setDeletingTransaction] = useState<TransactionResponseDto | null>(
    null,
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="title-l">{translations('content.title')}</Typography>
        <Button component={Link} href={PATHS.transactionsCreate} size="sm">
          <Plus size={16} />
          {translations('content.createButton')}
        </Button>
      </div>

      <div className={styles.filters}>
        <TransactionTypeFilter
          value={filters.type}
          onValueChange={(type) => {
            handleFilterChange({ type });
          }}
        />
        <TransactionDateFilter
          dateFrom={filters.dateFrom}
          dateTo={filters.dateTo}
          onDateFromChange={(dateFrom) => {
            handleFilterChange({ dateFrom });
          }}
          onDateToChange={(dateTo) => {
            handleFilterChange({ dateTo });
          }}
        />
      </div>

      <TransactionList transactionList={transactionList} onDelete={setDeletingTransaction} />

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

      <DeleteTransactionDialog
        transaction={deletingTransaction}
        onClose={() => {
          setDeletingTransaction(null);
        }}
        onSuccess={() => {
          setDeletingTransaction(null);
        }}
      />
    </div>
  );
};
