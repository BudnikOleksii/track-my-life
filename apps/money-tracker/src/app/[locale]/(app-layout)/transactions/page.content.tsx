'use client';

import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Pagination } from '@track-my-life/ui/src/components/molecules/pagination/pagination';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { DeleteTransactionDialog } from './components/delete-transaction-dialog/DeleteTransactionDialog';
import { TransactionDateFilter } from './components/transaction-date-filter/TransactionDateFilter';
import { TransactionForm } from './components/transaction-form/TransactionForm';
import { TransactionList } from './components/transaction-list/TransactionList';
import { TransactionTypeFilter } from './components/transaction-type-filter/TransactionTypeFilter';
import { useTransactionManagement } from './hooks/use-transaction-management';
import styles from './page.module.scss';

export const TransactionsPageContent: FC = () => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);

  const {
    transactionList,
    total,
    filters,
    isFormOpen,
    editingTransaction,
    deletingTransaction,
    handleCreate,
    handleEdit,
    handleDelete,
    handleFormClose,
    handleDeleteClose,
    handleFilterChange,
    handleFormSuccess,
    handleDeleteSuccess,
  } = useTransactionManagement();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant="title-l">{translations('content.title')}</Typography>
        <Button onClick={handleCreate} size="sm">
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

      <TransactionList
        transactionList={transactionList}
        onEdit={handleEdit}
        onDelete={handleDelete}
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

      <TransactionForm
        isOpen={isFormOpen}
        transaction={editingTransaction}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />

      <DeleteTransactionDialog
        transaction={deletingTransaction}
        onClose={handleDeleteClose}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
};
