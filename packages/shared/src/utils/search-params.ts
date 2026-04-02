import { getCurrentYearMonth, getMonthDateRange } from './date';

interface DateRange {
  dateFrom: string;
  dateTo: string;
}

interface SortParams {
  sortBy: string;
  sortOrder: string;
}

const VALID_SORT_BY_SET = new Set(['date', 'amount', 'createdAt']);
const VALID_SORT_ORDER_SET = new Set(['asc', 'desc']);

export const parseDateRange = (rawDateFrom: string, rawDateTo: string): DateRange => {
  if (rawDateFrom || rawDateTo) {
    return { dateFrom: rawDateFrom, dateTo: rawDateTo };
  }

  const { year, month } = getCurrentYearMonth();
  return getMonthDateRange(year, month);
};

export const parseSortParams = (rawSortBy: string, rawSortOrder: string): SortParams => ({
  sortBy: VALID_SORT_BY_SET.has(rawSortBy) ? rawSortBy : '',
  sortOrder: VALID_SORT_ORDER_SET.has(rawSortOrder) ? rawSortOrder : '',
});
