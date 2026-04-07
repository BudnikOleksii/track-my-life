import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscRecurringTransactionApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { cache } from 'react';

import { CACHE_TAG } from '@/constants/cache-tag';

const RECURRING_TRANSACTIONS_CACHE = {
  revalidate: 3600,
  tags: [CACHE_TAG.RECURRING_TRANSACTIONS],
} as const;

export const fetchRecurringTransaction = cache(
  async (id: string): Promise<RecurringTransactionResponseDto | null> => {
    const { data } = await rscRecurringTransactionApiService.fetchRecurringTransactionById(
      id,
      RECURRING_TRANSACTIONS_CACHE,
    );

    if (data && typeof data === 'object' && 'id' in data) {
      return data as RecurringTransactionResponseDto;
    }

    return null;
  },
);
