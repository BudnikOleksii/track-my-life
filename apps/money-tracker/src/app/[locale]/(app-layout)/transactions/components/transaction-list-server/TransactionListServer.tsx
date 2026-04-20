import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { convertFilterDateList } from '@track-my-life/shared/src/utils/convert-filter-date-list';
import { getLocale } from 'next-intl/server';

import { fetchCategoryList } from '@/actions/fetch-category-list';
import { getTimezoneOffset } from '@/utils/get-timezone-offset';

import type { TransactionFilters } from '../../constants/transaction-filters';

import { fetchTransactionList } from '../../actions/fetch-transaction-list';
import { checkIsSortBy, checkIsSortOrder } from '../../constants/sort';
import { TransactionsPageContent } from '../../page.content';
import { TransactionList } from '../transaction-list/TransactionList';

export const TransactionListServer: FC<TransactionFilters> = async ({
  page,
  pageSize,
  type,
  dateFrom,
  dateTo,
  categoryId,
  sortBy,
  sortOrder,
}) => {
  const normalizedSortBy = checkIsSortBy(sortBy) ? sortBy : '';
  const normalizedSortOrder = checkIsSortOrder(sortOrder) ? sortOrder : '';

  const offset = await getTimezoneOffset();
  const convertedDateRange = convertFilterDateList({ dateFrom, dateTo }, offset);

  const params = {
    page,
    pageSize,
    ...(type !== 'ALL' && { type }),
    ...convertedDateRange,
    ...(categoryId && { categoryId }),
    ...(normalizedSortBy && { sortBy: normalizedSortBy }),
    ...(normalizedSortOrder && { sortOrder: normalizedSortOrder }),
  };

  const [result, categoryList, locale] = await Promise.all([
    fetchTransactionList(params),
    fetchCategoryList(),
    getLocale(),
  ]);

  const transactionList = result?.data ?? [];
  const visibleIdList = transactionList.map((item) => item.id);

  return (
    <TransactionsPageContent
      total={result?.total ?? EMPTY_LIST_LENGTH}
      categoryList={categoryList ?? []}
      visibleIdList={visibleIdList}
      filters={{
        page,
        pageSize,
        type,
        dateFrom,
        dateTo,
        categoryId,
        sortBy: normalizedSortBy,
        sortOrder: normalizedSortOrder,
      }}
    >
      <TransactionList transactionList={transactionList} locale={locale} />
    </TransactionsPageContent>
  );
};
