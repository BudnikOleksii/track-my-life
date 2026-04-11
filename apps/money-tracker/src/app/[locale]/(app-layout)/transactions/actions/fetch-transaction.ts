import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { cache } from 'react';

import { TRANSACTIONS_CACHE } from '@/constants/cache-tag';

export const fetchTransaction = cache(
  async (id: string): Promise<TransactionResponseDto | null> => {
    const result = await rscTransactionApiService.fetchTransactionById(id, TRANSACTIONS_CACHE);

    return result.ok ? result.data : null;
  },
);
