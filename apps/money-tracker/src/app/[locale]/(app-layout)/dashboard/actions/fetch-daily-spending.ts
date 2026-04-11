import type {
  CurrencyCode,
  DailySpendingResponseDto,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionsAnalyticsApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { checkIsObject } from '@track-my-life/shared/src/constants/type-guard';
import { cache } from 'react';

import { ANALYTICS_CACHE } from '@/constants/cache-tag';

interface FetchDailySpendingParams {
  year: number;
  month: number;
  currencyCode: CurrencyCode;
  type?: TransactionType;
}

const checkIsDailySpendingResponse = (value: unknown): value is DailySpendingResponseDto =>
  checkIsObject(value) && 'days' in value && Array.isArray(value.days);

export const fetchDailySpending = cache(
  async (params: FetchDailySpendingParams): Promise<DailySpendingResponseDto | null> => {
    const { data } = await rscTransactionsAnalyticsApiService.fetchDailySpending(
      params,
      ANALYTICS_CACHE,
    );

    if (checkIsDailySpendingResponse(data)) {
      return data;
    }

    return null;
  },
);
