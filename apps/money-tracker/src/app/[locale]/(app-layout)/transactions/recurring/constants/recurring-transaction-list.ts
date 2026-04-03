import type { RecurringTransactionStatus } from '@track-my-life/shared/src/api/generated/types.gen';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;

export type RecurringTransactionFilterStatus = 'ALL' | RecurringTransactionStatus;

export const STATUS_FILTER_OPTION_LIST: RecurringTransactionFilterStatus[] = [
  'ALL',
  'ACTIVE',
  'PAUSED',
  'CANCELLED',
];
