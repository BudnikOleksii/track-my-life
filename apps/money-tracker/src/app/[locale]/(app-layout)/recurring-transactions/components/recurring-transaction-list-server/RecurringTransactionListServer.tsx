import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';

import { normalizeParam } from '@/constants/normalize-param';

import type { RecurringTransactionFilterStatus } from '../../constants/recurring-transaction-list';

import { fetchRecurringTransactionList } from '../../actions/fetch-recurring-transaction-list';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../constants/recurring-transaction-list';
import { RecurringTransactionsPageContent } from '../../page.content';

interface RecurringTransactionListServerProps {
  page: number;
  pageSize: number;
  status: RecurringTransactionFilterStatus;
}

export const RecurringTransactionListServer: FC<RecurringTransactionListServerProps> = async ({
  page,
  pageSize,
  status,
}) => {
  const params = {
    page,
    pageSize,
    ...(status !== 'ALL' && { status }),
  };

  const result = await fetchRecurringTransactionList(params);

  return (
    <RecurringTransactionsPageContent
      recurringTransactionList={result?.data ?? []}
      total={result?.total ?? EMPTY_LIST_LENGTH}
      filters={{ page, pageSize, status }}
    />
  );
};

const VALID_STATUS_SET = new Set(['ACTIVE', 'PAUSED', 'CANCELLED']);

export const parseRecurringTransactionSearchParams = (
  searchParams: Record<string, string | string[] | undefined>,
) => {
  const page = Number(normalizeParam(searchParams.page)) || DEFAULT_PAGE;
  const pageSize = Number(normalizeParam(searchParams.pageSize)) || DEFAULT_PAGE_SIZE;
  const rawStatus = normalizeParam(searchParams.status);
  const status: RecurringTransactionFilterStatus = VALID_STATUS_SET.has(rawStatus)
    ? (rawStatus as RecurringTransactionFilterStatus)
    : 'ALL';

  return { page, pageSize, status };
};
