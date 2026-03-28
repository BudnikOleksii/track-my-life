'use server';

import type {
  CategoryBreakdownResponseDto,
  CurrencyCode,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionsAnalyticsApiService } from '@track-my-life/shared/src/api/server-api';

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

export const fetchCategoryBreakdown = async (
  params: FetchCategoryBreakdownParams,
): Promise<CategoryBreakdownResponseDto | null> => {
  const { data } = await transactionsAnalyticsApiService.fetchCategoryBreakdown(params);

  if (checkIsCategoryBreakdownResponse(data)) {
    return data;
  }

  return null;
};
