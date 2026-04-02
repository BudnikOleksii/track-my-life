import { getCurrentYearMonth, getMonthDateRange } from './date';

interface DateRange {
  dateFrom: string;
  dateTo: string;
}

interface SortParams {
  sortBy: string;
  sortOrder: string;
}

interface ParseSortParamsOptions {
  rawSortBy: string;
  rawSortOrder: string;
  validSortBySet: Set<string>;
  validSortOrderSet: Set<string>;
}

export const parseDateRange = (rawDateFrom: string, rawDateTo: string): DateRange => {
  if (rawDateFrom || rawDateTo) {
    return { dateFrom: rawDateFrom, dateTo: rawDateTo };
  }

  const { year, month } = getCurrentYearMonth();
  return getMonthDateRange(year, month);
};

export const parseSortParams = ({
  rawSortBy,
  rawSortOrder,
  validSortBySet,
  validSortOrderSet,
}: ParseSortParamsOptions): SortParams => ({
  sortBy: validSortBySet.has(rawSortBy) ? rawSortBy : '',
  sortOrder: validSortOrderSet.has(rawSortOrder) ? rawSortOrder : '',
});
