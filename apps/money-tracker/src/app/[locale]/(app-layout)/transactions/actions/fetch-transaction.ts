import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionApiService } from '@track-my-life/shared/src/api/rsc-api';
import { cache } from 'react';

import { CACHE_TAG } from '@/constants/cache-tag';

const TRANSACTIONS_CACHE = { revalidate: 300, tags: [CACHE_TAG.TRANSACTIONS] } as const;

export const fetchTransaction = cache(
  async (id: string): Promise<TransactionResponseDto | null> => {
    const { data } = await rscTransactionApiService.fetchTransactionById(id, TRANSACTIONS_CACHE);

    if (data && typeof data === 'object' && 'id' in data) {
      return data as TransactionResponseDto;
    }

    return null;
  },
);
