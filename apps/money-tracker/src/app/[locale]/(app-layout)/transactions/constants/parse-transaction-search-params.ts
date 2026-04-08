import { parseDateRange, parseSortParams } from '@track-my-life/shared/src/utils/search-params';

import type { FilterValue } from '@/constants/transaction';

import { normalizeParam } from '@/constants/normalize-param';

import type { TransactionFilters } from './transaction-filters';

import { VALID_SORT_BY_SET, VALID_SORT_ORDER_SET } from './sort';
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
  const { sortBy, sortOrder } = parseSortParams({
    rawSortBy: normalizeParam(searchParams.sortBy),
    rawSortOrder: normalizeParam(searchParams.sortOrder),
    validSortBySet: VALID_SORT_BY_SET,
    validSortOrderSet: VALID_SORT_ORDER_SET,
  });

  return { page, pageSize, type, dateFrom, dateTo, categoryId, sortBy, sortOrder };
};
