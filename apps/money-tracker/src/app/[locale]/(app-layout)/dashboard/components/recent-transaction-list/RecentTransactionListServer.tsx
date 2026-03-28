import type { FC } from 'react';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchTransactionList } from '../../../transactions/actions/fetch-transaction-list';
import { RECENT_TRANSACTION_LIST_LIMIT } from '../../constants/dashboard';
import { RecentTransactionList } from './RecentTransactionList';

interface RecentTransactionListServerProps {
  filters: DashboardFilters;
}

export const RecentTransactionListServer: FC<RecentTransactionListServerProps> = async ({
  filters,
}) => {
  const result = await fetchTransactionList({
    pageSize: RECENT_TRANSACTION_LIST_LIMIT,
    ...(filters.type !== 'ALL' && { type: filters.type }),
    ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
    ...(filters.dateTo && { dateTo: filters.dateTo }),
  });

  return <RecentTransactionList transactionList={result?.data ?? []} />;
};
