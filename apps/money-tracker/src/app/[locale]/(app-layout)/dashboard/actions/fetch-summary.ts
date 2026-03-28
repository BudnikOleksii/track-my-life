'use server';

import type {
  CurrencyCode,
  SummaryResponseDto,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionsAnalyticsApiService } from '@track-my-life/shared/src/api/server-api';

interface FetchSummaryParams {
  currencyCode: CurrencyCode;
  dateFrom?: string;
  dateTo?: string;
  type?: TransactionType;
}

const checkIsSummaryResponse = (value: unknown): value is SummaryResponseDto =>
  typeof value === 'object' && value !== null && 'totalIncome' in value;

export const fetchSummary = async (
  params: FetchSummaryParams,
): Promise<SummaryResponseDto | null> => {
  const { data } = await transactionsAnalyticsApiService.fetchSummary(params);

  if (checkIsSummaryResponse(data)) {
    return data;
  }

  return null;
};
