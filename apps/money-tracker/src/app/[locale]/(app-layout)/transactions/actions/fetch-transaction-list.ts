'use server';

import type {
  TransactionListResponseDto,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { transactionApiService } from '@track-my-life/shared/src/api/server-api';

interface FetchTransactionListParams {
  page?: number;
  pageSize?: number;
  type?: TransactionType;
  dateFrom?: string;
  dateTo?: string;
}

const checkIsTransactionListResponse = (value: unknown): value is TransactionListResponseDto =>
  typeof value === 'object' &&
  value !== null &&
  'data' in value &&
  Array.isArray((value as Record<string, unknown>).data);

export const fetchTransactionList = async (
  params?: FetchTransactionListParams,
): Promise<TransactionListResponseDto | null> => {
  const { data } = await transactionApiService.fetchTransactionList(params);

  if (checkIsTransactionListResponse(data)) {
    return data;
  }

  return null;
};
