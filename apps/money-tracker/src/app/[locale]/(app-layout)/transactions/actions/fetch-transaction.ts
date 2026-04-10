import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { cache } from 'react';

import { CACHE_TAG } from '@/constants/cache-tag';

const TRANSACTIONS_CACHE = { revalidate: 300, tags: [CACHE_TAG.TRANSACTIONS] } as const;

export const fetchTransaction = cache(
  async (id: string): Promise<TransactionResponseDto | null> => {
    const result = await rscTransactionApiService.fetchTransactionById(id, TRANSACTIONS_CACHE);

    return result.ok ? result.data : null;
  },
);
