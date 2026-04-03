import type {
  RecurringFrequency,
  RecurringTransactionListResponseDto,
  RecurringTransactionStatus,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscRecurringTransactionApiService } from '@track-my-life/shared/src/api/rsc-api';

interface FetchRecurringTransactionListParams {
  page?: number;
  pageSize?: number;
  status?: RecurringTransactionStatus;
  frequency?: RecurringFrequency;
}

const checkIsRecurringTransactionListResponse = (
  value: unknown,
): value is RecurringTransactionListResponseDto =>
  typeof value === 'object' &&
  value !== null &&
  'data' in value &&
  Array.isArray((value as Record<string, unknown>).data);

export const fetchRecurringTransactionList = async (
  params?: FetchRecurringTransactionListParams,
): Promise<RecurringTransactionListResponseDto | null> => {
  const { data } = await rscRecurringTransactionApiService.fetchRecurringTransactionList(params);

  if (checkIsRecurringTransactionListResponse(data)) {
    return data;
  }

  return null;
};
