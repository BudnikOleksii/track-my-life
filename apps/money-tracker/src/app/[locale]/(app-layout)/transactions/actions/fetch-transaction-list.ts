import type {
  TransactionListResponseDto,
  TransactionsControllerFindAllData,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { checkIsObject } from '@track-my-life/shared/src/constants/type-guard';
import { cache } from 'react';

import { TRANSACTIONS_CACHE } from '@/constants/cache-tag';

const checkIsTransactionListResponse = (value: unknown): value is TransactionListResponseDto =>
  checkIsObject(value) && 'data' in value && Array.isArray(value.data);

export const fetchTransactionList = cache(
  async (
    params?: TransactionsControllerFindAllData['query'],
  ): Promise<TransactionListResponseDto | null> => {
    const { data } = await rscTransactionApiService.fetchTransactionList(
      params,
      TRANSACTIONS_CACHE,
    );
    if (checkIsTransactionListResponse(data)) {
      return data;
    }

    return null;
  },
);
