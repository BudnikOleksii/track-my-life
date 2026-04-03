import type {
  CategoryBreakdownResponseDto,
  CurrencyCode,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionsAnalyticsApiService } from '@track-my-life/shared/src/api/rsc-api';
import { cache } from 'react';

import { CACHE_TAG } from '@/constants/cache-tag';

const ANALYTICS_CACHE = { revalidate: 300, tags: [CACHE_TAG.ANALYTICS] } as const;

interface FetchCategoryBreakdownParams {
  currencyCode: CurrencyCode;
  dateFrom?: string;
  dateTo?: string;
  type?: TransactionType;
}

const checkIsCategoryBreakdownResponse = (value: unknown): value is CategoryBreakdownResponseDto =>
  typeof value === 'object' &&
  value !== null &&
  'breakdown' in value &&
  Array.isArray((value as Record<string, unknown>).breakdown);

export const fetchCategoryBreakdown = cache(
  async (params: FetchCategoryBreakdownParams): Promise<CategoryBreakdownResponseDto | null> => {
    const { data } = await rscTransactionsAnalyticsApiService.fetchCategoryBreakdown(
      params,
      ANALYTICS_CACHE,
    );

    if (checkIsCategoryBreakdownResponse(data)) {
      return data;
    }

    return null;
  },
);
