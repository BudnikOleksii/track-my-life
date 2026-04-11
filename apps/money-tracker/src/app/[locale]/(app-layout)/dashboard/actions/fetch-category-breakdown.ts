import type {
  CategoryBreakdownResponseDto,
  CurrencyCode,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionsAnalyticsApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { checkIsObject } from '@track-my-life/shared/src/constants/type-guard';
import { cache } from 'react';

import { ANALYTICS_CACHE } from '@/constants/cache-tag';

interface FetchCategoryBreakdownParams {
  currencyCode: CurrencyCode;
  dateFrom?: string;
  dateTo?: string;
  type?: TransactionType;
}

const checkIsCategoryBreakdownResponse = (value: unknown): value is CategoryBreakdownResponseDto =>
  checkIsObject(value) && 'breakdown' in value && Array.isArray(value.breakdown);

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
