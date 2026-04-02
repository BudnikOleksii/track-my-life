import type {
  TransactionListResponseDto,
  TransactionsControllerFindAllData,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionApiService } from '@track-my-life/shared/src/api/rsc-api';

const checkIsTransactionListResponse = (value: unknown): value is TransactionListResponseDto =>
  typeof value === 'object' &&
  value !== null &&
  'data' in value &&
  Array.isArray((value as Record<string, unknown>).data);

export const fetchTransactionList = async (
  params?: TransactionsControllerFindAllData['query'],
): Promise<TransactionListResponseDto | null> => {
  const { data } = await rscTransactionApiService.fetchTransactionList(params);

  if (checkIsTransactionListResponse(data)) {
    return data;
  }

  return null;
};
