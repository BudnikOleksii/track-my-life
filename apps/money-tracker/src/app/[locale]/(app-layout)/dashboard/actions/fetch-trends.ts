import type {
  CurrencyCode,
  Granularity,
  TransactionType,
  TrendsResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionsAnalyticsApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { checkIsObject } from '@track-my-life/shared/src/constants/type-guard';
import { cache } from 'react';

import { CACHE_TAG } from '@/constants/cache-tag';

const ANALYTICS_CACHE = { revalidate: 300, tags: [CACHE_TAG.ANALYTICS] } as const;

interface FetchTrendsParams {
  currencyCode: CurrencyCode;
  granularity: Granularity;
  dateFrom?: string;
  dateTo?: string;
  type?: TransactionType;
}

const checkIsTrendsResponse = (value: unknown): value is TrendsResponseDto =>
  checkIsObject(value) && 'periods' in value && Array.isArray(value.periods);

export const fetchTrends = cache(
  async (params: FetchTrendsParams): Promise<TrendsResponseDto | null> => {
    const { data } = await rscTransactionsAnalyticsApiService.fetchTrends(params, ANALYTICS_CACHE);

    if (checkIsTrendsResponse(data)) {
      return data;
    }

    return null;
  },
);
