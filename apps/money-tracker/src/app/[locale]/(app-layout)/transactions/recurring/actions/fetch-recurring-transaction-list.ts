import type {
  RecurringFrequency,
  RecurringTransactionListResponseDto,
  RecurringTransactionStatus,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscRecurringTransactionApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { checkIsObject } from '@track-my-life/shared/src/constants/type-guard';
import { cache } from 'react';

import { RECURRING_TRANSACTIONS_CACHE } from '@/constants/cache-tag';

interface FetchRecurringTransactionListParams {
  page?: number;
  pageSize?: number;
  status?: RecurringTransactionStatus;
  frequency?: RecurringFrequency;
}

const checkIsRecurringTransactionListResponse = (
  value: unknown,
): value is RecurringTransactionListResponseDto =>
  checkIsObject(value) && 'data' in value && Array.isArray(value.data);

export const fetchRecurringTransactionList = cache(
  async (
    params?: FetchRecurringTransactionListParams,
  ): Promise<RecurringTransactionListResponseDto | null> => {
    const { data } = await rscRecurringTransactionApiService.fetchRecurringTransactionList(
      params,
      RECURRING_TRANSACTIONS_CACHE,
    );

    if (checkIsRecurringTransactionListResponse(data)) {
      return data;
    }

    return null;
  },
);
