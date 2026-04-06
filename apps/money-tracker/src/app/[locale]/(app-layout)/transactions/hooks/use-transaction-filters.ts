import type { FilterValue } from '@/constants/transaction';

import { useUrlFilters } from '@/hooks/use-url-filters';

import { DEFAULT_PAGE } from '../constants/transaction-list';

interface TransactionFilterUpdate {
  page?: number;
  pageSize?: number;
  type?: FilterValue;
  dateFrom?: string;
  dateTo?: string;
  categoryId?: string;
  currencyCode?: string;
  sortBy?: string;
  sortOrder?: string;
}

const FILTER_KEY_TO_SEARCH_PARAM: Record<keyof TransactionFilterUpdate, string> = {
  page: 'page',
  pageSize: 'pageSize',
  type: 'type',
  dateFrom: 'dateFrom',
  dateTo: 'dateTo',
  categoryId: 'categoryId',
  currencyCode: 'currencyCode',
  sortBy: 'sortBy',
  sortOrder: 'sortOrder',
};

const PAGE_RESET_KEY_SET = new Set<string>([
  'type',
  'dateFrom',
  'dateTo',
  'pageSize',
  'categoryId',
  'currencyCode',
  'sortBy',
  'sortOrder',
]);

export const useTransactionFilters = () =>
  useUrlFilters<TransactionFilterUpdate>({
    filterKeyToSearchParam: FILTER_KEY_TO_SEARCH_PARAM,
    pageResetKeySet: PAGE_RESET_KEY_SET,
    defaultPage: DEFAULT_PAGE,
  });
