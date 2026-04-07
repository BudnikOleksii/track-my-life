import type { TransactionsByCategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { cache } from 'react';

import { CACHE_TAG } from '@/constants/cache-tag';

const TRANSACTIONS_CACHE = { revalidate: 300, tags: [CACHE_TAG.TRANSACTIONS] } as const;

export const fetchTransactionsByCategory = cache(
  async (categoryId: string): Promise<TransactionsByCategoryResponseDto | null> => {
    const { data } = await rscTransactionApiService.fetchTransactionsByCategory(
      categoryId,
      TRANSACTIONS_CACHE,
    );

    if (data && typeof data === 'object' && 'groups' in data && Array.isArray(data.groups)) {
      return data as TransactionsByCategoryResponseDto;
    }

    return null;
  },
);
