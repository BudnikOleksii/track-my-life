import { normalizeParam } from '@/constants/normalize-param';

import type { RecurringTransactionFilterStatus } from './recurring-transaction-list';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from './recurring-transaction-list';

const VALID_STATUS_SET = new Set<RecurringTransactionFilterStatus>([
  'ACTIVE',
  'PAUSED',
  'CANCELLED',
]);

const checkIsValidStatus = (value: string): value is RecurringTransactionFilterStatus =>
  VALID_STATUS_SET.has(value as RecurringTransactionFilterStatus);

export const parseRecurringTransactionSearchParams = (
  searchParams: Record<string, string | string[] | undefined>,
) => {
  const page = Number(normalizeParam(searchParams.page)) || DEFAULT_PAGE;
  const pageSize = Number(normalizeParam(searchParams.pageSize)) || DEFAULT_PAGE_SIZE;
  const rawStatus = normalizeParam(searchParams.status);
  const status: RecurringTransactionFilterStatus = checkIsValidStatus(rawStatus)
    ? rawStatus
    : 'ALL';

  return { page, pageSize, status };
};
