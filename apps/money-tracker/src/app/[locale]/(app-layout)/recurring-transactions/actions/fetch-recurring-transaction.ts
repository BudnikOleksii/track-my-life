import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscRecurringTransactionApiService } from '@track-my-life/shared/src/api/rsc-api';

export const fetchRecurringTransaction = async (
  id: string,
): Promise<RecurringTransactionResponseDto | null> => {
  const { data } = await rscRecurringTransactionApiService.fetchRecurringTransactionById(id);

  if (data && typeof data === 'object' && 'id' in data) {
    return data as RecurringTransactionResponseDto;
  }

  return null;
};
