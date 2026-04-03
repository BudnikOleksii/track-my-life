import type { FC } from 'react';

import { checkIsCurrencyCode } from '@track-my-life/shared/src/constants/currency';
import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';

import { fetchCategoryList } from '@/actions/fetch-category-list';

import type { TransactionFilters } from '../../constants/transaction-filters';

import { fetchTransactionList } from '../../actions/fetch-transaction-list';
import { checkIsSortBy, checkIsSortOrder } from '../../constants/sort';
import { TransactionsPageContent } from '../../page.content';

export const TransactionListServer: FC<TransactionFilters> = async ({
  page,
  pageSize,
  type,
  dateFrom,
  dateTo,
  categoryId,
  currencyCode,
  sortBy,
  sortOrder,
}) => {
  const normalizedCurrencyCode = checkIsCurrencyCode(currencyCode) ? currencyCode : '';
  const normalizedSortBy = checkIsSortBy(sortBy) ? sortBy : '';
  const normalizedSortOrder = checkIsSortOrder(sortOrder) ? sortOrder : '';

  const params = {
    page,
    pageSize,
    ...(type !== 'ALL' && { type }),
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
    ...(categoryId && { categoryId }),
    ...(normalizedCurrencyCode && { currencyCode: normalizedCurrencyCode }),
    ...(normalizedSortBy && { sortBy: normalizedSortBy }),
    ...(normalizedSortOrder && { sortOrder: normalizedSortOrder }),
  };

  const [result, categoryList] = await Promise.all([
    fetchTransactionList(params),
    fetchCategoryList(),
  ]);

  return (
    <TransactionsPageContent
      transactionList={result?.data ?? []}
      total={result?.total ?? EMPTY_LIST_LENGTH}
      categoryList={categoryList}
      filters={{
        page,
        pageSize,
        type,
        dateFrom,
        dateTo,
        categoryId,
        currencyCode: normalizedCurrencyCode,
        sortBy: normalizedSortBy,
        sortOrder: normalizedSortOrder,
      }}
    />
  );
};
