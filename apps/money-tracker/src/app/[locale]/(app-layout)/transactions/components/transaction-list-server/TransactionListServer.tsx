import type { CurrencyCode } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';

import { fetchCategoryList } from '@/actions/fetch-category-list';

import type { TransactionFilters } from '../../constants/transaction-filters';

import { fetchTransactionList } from '../../actions/fetch-transaction-list';
import { TransactionsPageContent } from '../../page.content';

const VALID_SORT_BY_SET = new Set(['date', 'amount', 'createdAt']);
const VALID_SORT_ORDER_SET = new Set(['asc', 'desc']);

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
    ...(currencyCode && { currencyCode: currencyCode as CurrencyCode }),
    ...(VALID_SORT_BY_SET.has(sortBy) && { sortBy: sortBy as 'date' | 'amount' | 'createdAt' }),
    ...(VALID_SORT_ORDER_SET.has(sortOrder) && { sortOrder: sortOrder as 'asc' | 'desc' }),
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
