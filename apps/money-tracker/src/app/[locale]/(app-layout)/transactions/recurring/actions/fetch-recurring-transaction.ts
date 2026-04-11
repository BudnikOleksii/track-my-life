import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscRecurringTransactionApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { cache } from 'react';

import { RECURRING_TRANSACTIONS_CACHE } from '@/constants/cache-tag';

export const fetchRecurringTransaction = cache(
  async (id: string): Promise<RecurringTransactionResponseDto | null> => {
    const result = await rscRecurringTransactionApiService.fetchRecurringTransactionById(
      id,
      RECURRING_TRANSACTIONS_CACHE,
    );

    return result.ok ? result.data : null;
  },
);
