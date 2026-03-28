import type {
  CurrencyCode,
  Granularity,
  TransactionType,
  TrendsResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionsAnalyticsApiService } from '@track-my-life/shared/src/api/rsc-api';

interface FetchTrendsParams {
  currencyCode: CurrencyCode;
  granularity: Granularity;
  dateFrom?: string;
  dateTo?: string;
  type?: TransactionType;
}

const checkIsTrendsResponse = (value: unknown): value is TrendsResponseDto =>
  typeof value === 'object' &&
  value !== null &&
  'periods' in value &&
  Array.isArray((value as Record<string, unknown>).periods);

export const fetchTrends = async (params: FetchTrendsParams): Promise<TrendsResponseDto | null> => {
  const { data } = await rscTransactionsAnalyticsApiService.fetchTrends(params);

  if (checkIsTrendsResponse(data)) {
    return data;
  }

  return null;
};
