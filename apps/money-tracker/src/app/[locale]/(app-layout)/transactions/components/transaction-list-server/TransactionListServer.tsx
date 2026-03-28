import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';

import type { FilterValue } from '@/constants/transaction';

import { fetchCategoryList } from '@/actions/fetch-category-list';
import { normalizeParam } from '@/constants/normalize-param';

import { fetchTransactionList } from '../../actions/fetch-transaction-list';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../constants/transaction-list';
import { TransactionsPageContent } from '../../page.content';

interface TransactionListServerProps {
  page: number;
  pageSize: number;
  type: FilterValue;
  dateFrom: string;
  dateTo: string;
}

export const TransactionListServer: FC<TransactionListServerProps> = async ({
  page,
  pageSize,
  type,
  dateFrom,
  dateTo,
}) => {
  const params = {
    page,
    pageSize,
    ...(type !== 'ALL' && { type }),
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
  };

  const [result, categoryList] = await Promise.all([
    fetchTransactionList(params),
    fetchCategoryList(),
  ]);

  return (
    <TransactionsPageContent
      transactionList={result?.data ?? []}
      total={result?.total ?? EMPTY_LIST_LENGTH}
      filters={{ page, pageSize, type, dateFrom, dateTo }}
      categoryList={categoryList}
    />
  );
};

export const parseTransactionSearchParams = (
  searchParams: Record<string, string | string[] | undefined>,
) => {
  const page = Number(normalizeParam(searchParams.page)) || DEFAULT_PAGE;
  const pageSize = Number(normalizeParam(searchParams.pageSize)) || DEFAULT_PAGE_SIZE;
  const rawType = normalizeParam(searchParams.type);
  const type: FilterValue = rawType === 'INCOME' || rawType === 'EXPENSE' ? rawType : 'ALL';
  const dateFrom = normalizeParam(searchParams.dateFrom);
  const dateTo = normalizeParam(searchParams.dateTo);

  return { page, pageSize, type, dateFrom, dateTo };
};
