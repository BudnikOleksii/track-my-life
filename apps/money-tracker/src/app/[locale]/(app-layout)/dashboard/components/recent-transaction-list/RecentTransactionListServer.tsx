import type { FC } from 'react';

import { convertFilterDateList } from '@track-my-life/shared/src/utils/convert-filter-date-list';

import { getTimezoneOffset } from '@/utils/get-timezone-offset';

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
  const offset = await getTimezoneOffset();
  const result = await fetchTransactionList({
    pageSize: RECENT_TRANSACTION_LIST_LIMIT,
    ...(filters.type !== 'ALL' && { type: filters.type }),
    ...convertFilterDateList(filters, offset),
  });

  return <RecentTransactionList transactionList={result?.data ?? []} />;
};
