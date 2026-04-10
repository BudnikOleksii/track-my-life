'use client';

import type {
  CategoryResponseDto,
  TransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import {
  getMonthDateRange,
  parseMonthFromDateRange,
} from '@track-my-life/shared/src/utils/date/year-month';
import { Pagination } from '@track-my-life/ui/src/components/molecules/pagination/pagination';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { TypeFilter } from '@/components/type-filter/TypeFilter';
import { FILTER_TO_LABEL_KEY } from '@/constants/filter';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { TransactionFilters } from './constants/transaction-filters';

import { CategoryPicker } from './components/category-picker/CategoryPicker';
import { DeleteTransactionDialog } from './components/delete-transaction-dialog/DeleteTransactionDialog';
import { MonthNavigator } from './components/month-navigator/MonthNavigator';
import { TransactionList } from './components/transaction-list/TransactionList';
import { TransactionSortFilter } from './components/transaction-sort-filter/TransactionSortFilter';
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

  const filterLabelMap = useMemo(
    () => ({
      ALL: translations(FILTER_TO_LABEL_KEY.ALL),
      INCOME: translations(FILTER_TO_LABEL_KEY.INCOME),
      EXPENSE: translations(FILTER_TO_LABEL_KEY.EXPENSE),
    }),
    [translations],
  );

  const handleMonthChange = (newYear: number, newMonth: number) => {
    const { dateFrom, dateTo } = getMonthDateRange(newYear, newMonth);
    handleFilterChange({ dateFrom, dateTo });
  };

  return (
    <>
      <div className={styles.filterSection}>
        <div className={styles.primaryFilterList}>
          <TypeFilter
            value={filters.type}
            onValueChange={(type) => {
              handleFilterChange({ type, categoryId: '' });
            }}
            ariaLabel={translations('content.filterByType')}
            labelMap={filterLabelMap}
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
          <CategoryPicker
            categoryList={categoryList}
            transactionType={filters.type === 'ALL' ? '' : filters.type}
            value={filters.categoryId}
            onValueChange={(categoryId) => {
              handleFilterChange({ categoryId });
            }}
            showAllOption
            allCategoriesLabel={translations('content.allCategories')}
            allParentLabel={translations('content.allParentCategory')}
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
