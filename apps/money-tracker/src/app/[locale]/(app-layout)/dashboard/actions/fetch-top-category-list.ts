'use server';

import type {
  CurrencyCode,
  TopCategoriesResponseDto,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionsAnalyticsApiService } from '@track-my-life/shared/src/api/server-api';

interface FetchTopCategoryListParams {
  currencyCode: CurrencyCode;
  dateFrom?: string;
  dateTo?: string;
  type?: TransactionType;
  limit?: number;
}

const checkIsTopCategoriesResponse = (value: unknown): value is TopCategoriesResponseDto =>
  typeof value === 'object' &&
  value !== null &&
  'categories' in value &&
  Array.isArray((value as Record<string, unknown>).categories);

export const fetchTopCategoryList = async (
  params: FetchTopCategoryListParams,
): Promise<TopCategoriesResponseDto | null> => {
  const { data } = await transactionsAnalyticsApiService.fetchTopCategories(params);

  if (checkIsTopCategoriesResponse(data)) {
    return data;
  }

  return null;
};
