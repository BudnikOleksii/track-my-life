import { useUrlFilters } from '@/hooks/use-url-filters';

import type { RecurringTransactionFilterStatus } from '../constants/recurring-transaction-list';

import { DEFAULT_PAGE } from '../constants/recurring-transaction-list';

interface RecurringTransactionFilterUpdate {
  page?: number;
  pageSize?: number;
  status?: RecurringTransactionFilterStatus;
}

const FILTER_KEY_TO_SEARCH_PARAM: Record<keyof RecurringTransactionFilterUpdate, string> = {
  page: 'page',
  pageSize: 'pageSize',
  status: 'status',
};

const PAGE_RESET_KEY_SET = new Set<string>(['status', 'pageSize']);

export const useRecurringTransactionFilters = () =>
  useUrlFilters<RecurringTransactionFilterUpdate>({
    filterKeyToSearchParam: FILTER_KEY_TO_SEARCH_PARAM,
    pageResetKeySet: PAGE_RESET_KEY_SET,
    defaultPage: DEFAULT_PAGE,
  });
