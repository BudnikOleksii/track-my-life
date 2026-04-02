import type {
  CurrencyCode,
  SortOrder,
  TransactionSortBy,
} from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';

import { fetchCategoryList } from '@/actions/fetch-category-list';

import type { TransactionFilters } from '../../constants/transaction-filters';

import { fetchTransactionList } from '../../actions/fetch-transaction-list';
import { VALID_SORT_BY_SET, VALID_SORT_ORDER_SET } from '../../constants/sort';
import { TransactionsPageContent } from '../../page.content';

const EMPTY_STRING_LENGTH = 0;

const checkIsCurrencyCode = (value: string): value is CurrencyCode =>
  value.length > EMPTY_STRING_LENGTH;

const checkIsSortBy = (value: string): value is TransactionSortBy => VALID_SORT_BY_SET.has(value);

const checkIsSortOrder = (value: string): value is SortOrder => VALID_SORT_ORDER_SET.has(value);

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
  const params = {
    page,
    pageSize,
    ...(type !== 'ALL' && { type }),
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
    ...(categoryId && { categoryId }),
    ...(checkIsCurrencyCode(currencyCode) && { currencyCode }),
    ...(checkIsSortBy(sortBy) && { sortBy }),
    ...(checkIsSortOrder(sortOrder) && { sortOrder }),
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
        currencyCode,
        sortBy,
        sortOrder,
      }}
    />
  );
};
