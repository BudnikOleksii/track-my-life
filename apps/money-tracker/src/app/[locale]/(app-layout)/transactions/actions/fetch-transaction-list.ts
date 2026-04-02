import type {
  CurrencyCode,
  TransactionListResponseDto,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionApiService } from '@track-my-life/shared/src/api/rsc-api';

interface FetchTransactionListParams {
  page?: number;
  pageSize?: number;
  type?: TransactionType;
  dateFrom?: string;
  dateTo?: string;
  categoryId?: string;
  currencyCode?: CurrencyCode;
  sortBy?: 'date' | 'amount' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

const checkIsTransactionListResponse = (value: unknown): value is TransactionListResponseDto =>
  typeof value === 'object' &&
  value !== null &&
  'data' in value &&
  Array.isArray((value as Record<string, unknown>).data);

export const fetchTransactionList = async (
  params?: FetchTransactionListParams,
): Promise<TransactionListResponseDto | null> => {
  const { data } = await rscTransactionApiService.fetchTransactionList(params);

  if (checkIsTransactionListResponse(data)) {
    return data;
  }

  return null;
};
