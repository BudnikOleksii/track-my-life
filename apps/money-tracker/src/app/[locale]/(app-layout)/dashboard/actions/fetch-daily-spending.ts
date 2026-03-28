'use server';

import type {
  CurrencyCode,
  DailySpendingResponseDto,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionsAnalyticsApiService } from '@track-my-life/shared/src/api/server-api';

interface FetchDailySpendingParams {
  year: number;
  month: number;
  currencyCode: CurrencyCode;
  type?: TransactionType;
}

const checkIsDailySpendingResponse = (value: unknown): value is DailySpendingResponseDto =>
  typeof value === 'object' &&
  value !== null &&
  'days' in value &&
  Array.isArray((value as Record<string, unknown>).days);

export const fetchDailySpending = async (
  params: FetchDailySpendingParams,
): Promise<DailySpendingResponseDto | null> => {
  const { data } = await transactionsAnalyticsApiService.fetchDailySpending(params);

  if (checkIsDailySpendingResponse(data)) {
    return data;
  }

  return null;
};
