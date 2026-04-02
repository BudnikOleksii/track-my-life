import { parseDateRange, parseSortParams } from '@track-my-life/shared/src/utils/search-params';

import type { FilterValue } from '@/constants/transaction';

import { normalizeParam } from '@/constants/normalize-param';

import type { TransactionFilters } from './transaction-filters';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from './transaction-list';

export const parseTransactionSearchParams = (
  searchParams: Record<string, string | string[] | undefined>,
): TransactionFilters => {
  const page = Number(normalizeParam(searchParams.page)) || DEFAULT_PAGE;
  const pageSize = Number(normalizeParam(searchParams.pageSize)) || DEFAULT_PAGE_SIZE;
  const rawType = normalizeParam(searchParams.type);
  const type: FilterValue = rawType === 'INCOME' || rawType === 'EXPENSE' ? rawType : 'ALL';
  const { dateFrom, dateTo } = parseDateRange(
    normalizeParam(searchParams.dateFrom),
    normalizeParam(searchParams.dateTo),
  );
  const categoryId = normalizeParam(searchParams.categoryId);
  const currencyCode = normalizeParam(searchParams.currencyCode);
  const { sortBy, sortOrder } = parseSortParams(
    normalizeParam(searchParams.sortBy),
    normalizeParam(searchParams.sortOrder),
  );

  return { page, pageSize, type, dateFrom, dateTo, categoryId, currencyCode, sortBy, sortOrder };
};
