import type {
  CurrencyCode,
  SummaryResponseDto,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionsAnalyticsApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { cache } from 'react';

import { ANALYTICS_CACHE } from '@/constants/cache-tag';

interface FetchSummaryParams {
  currencyCode: CurrencyCode;
  dateFrom?: string;
  dateTo?: string;
  type?: TransactionType;
}

const checkIsSummaryResponse = (value: unknown): value is SummaryResponseDto =>
  typeof value === 'object' && value !== null && 'totalIncome' in value;

export const fetchSummary = cache(
  async (params: FetchSummaryParams): Promise<SummaryResponseDto | null> => {
    const { data } = await rscTransactionsAnalyticsApiService.fetchSummary(params, ANALYTICS_CACHE);

    if (checkIsSummaryResponse(data)) {
      return data;
    }

    return null;
  },
);
