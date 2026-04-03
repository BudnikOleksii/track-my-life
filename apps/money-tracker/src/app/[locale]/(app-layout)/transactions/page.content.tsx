'use client';

import type {
  CategoryResponseDto,
  TransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { getMonthDateRange, parseMonthFromDateRange } from '@track-my-life/shared/src/utils/date';
import { Pagination } from '@track-my-life/ui/src/components/molecules/pagination/pagination';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { TransactionFilters } from './constants/transaction-filters';

import { DeleteTransactionDialog } from './components/delete-transaction-dialog/DeleteTransactionDialog';
import { MonthNavigator } from './components/month-navigator/MonthNavigator';
import { TransactionCategoryFilter } from './components/transaction-category-filter/TransactionCategoryFilter';
import { TransactionCurrencyFilter } from './components/transaction-currency-filter/TransactionCurrencyFilter';
import { TransactionList } from './components/transaction-list/TransactionList';
import { TransactionSortFilter } from './components/transaction-sort-filter/TransactionSortFilter';
import { TransactionTypeFilter } from './components/transaction-type-filter/TransactionTypeFilter';
import { useTransactionFilters } from './hooks/use-transaction-filters';
import styles from './page.module.scss';

interface TransactionsPageContentProps {
  transactionList: TransactionResponseDto[];
  total: number;
  categoryList: CategoryResponseDto[];
  filters: TransactionFilters;
}

export const TransactionsPageContent: FC<TransactionsPageContentProps> = ({
  transactionList,
  total,
  categoryList,
  filters,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);
  const { handleFilterChange } = useTransactionFilters();
  const [deletingTransaction, setDeletingTransaction] = useState<TransactionResponseDto | null>(
    null,
  );

  const { year, month } = parseMonthFromDateRange(filters.dateFrom);

  const handleMonthChange = (newYear: number, newMonth: number) => {
    const { dateFrom, dateTo } = getMonthDateRange(newYear, newMonth);
    handleFilterChange({ dateFrom, dateTo });
  };

  return (
    <>
      <div className={styles.filterSection}>
        <div className={styles.primaryFilterList}>
          <TransactionTypeFilter
            value={filters.type}
            onValueChange={(type) => {
              handleFilterChange({ type });
            }}
          />
          <MonthNavigator year={year} month={month} onMonthChange={handleMonthChange} />
          <TransactionSortFilter
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            onSortByChange={(sortBy) => {
              handleFilterChange({ sortBy });
            }}
            onSortOrderChange={(sortOrder) => {
              handleFilterChange({ sortOrder });
            }}
          />
        </div>
        <div className={styles.secondaryFilterList}>
          <TransactionCategoryFilter
            categoryId={filters.categoryId}
            categoryList={categoryList}
            onCategoryChange={(categoryId) => {
              handleFilterChange({ categoryId });
            }}
          />
          <TransactionCurrencyFilter
            currencyCode={filters.currencyCode}
            onCurrencyChange={(currencyCode) => {
              handleFilterChange({ currencyCode });
            }}
          />
        </div>
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
    </>
  );
};
