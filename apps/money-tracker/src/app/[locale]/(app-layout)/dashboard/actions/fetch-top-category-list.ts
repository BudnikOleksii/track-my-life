import type {
  CurrencyCode,
  TopCategoriesResponseDto,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionsAnalyticsApiService } from '@track-my-life/shared/src/api/rsc-api';
import { checkIsObject } from '@track-my-life/shared/src/constants/type-guard';
import { cache } from 'react';

import { CACHE_TAG } from '@/constants/cache-tag';

const ANALYTICS_CACHE = { revalidate: 300, tags: [CACHE_TAG.ANALYTICS] } as const;

interface FetchTopCategoryListParams {
  currencyCode: CurrencyCode;
  dateFrom?: string;
  dateTo?: string;
  type?: TransactionType;
  limit?: number;
}

const checkIsTopCategoriesResponse = (value: unknown): value is TopCategoriesResponseDto =>
  checkIsObject(value) && 'categories' in value && Array.isArray(value.categories);

export const fetchTopCategoryList = cache(
  async (params: FetchTopCategoryListParams): Promise<TopCategoriesResponseDto | null> => {
    const { data } = await rscTransactionsAnalyticsApiService.fetchTopCategories(
      params,
      ANALYTICS_CACHE,
    );

    if (checkIsTopCategoriesResponse(data)) {
      return data;
    }

    return null;
  },
);
