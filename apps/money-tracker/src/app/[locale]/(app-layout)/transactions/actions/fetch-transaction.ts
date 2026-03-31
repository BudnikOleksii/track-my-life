import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionApiService } from '@track-my-life/shared/src/api/rsc-api';

export const fetchTransaction = async (id: string): Promise<TransactionResponseDto | null> => {
  const { data } = await rscTransactionApiService.fetchTransactionById(id);

  if (data && typeof data === 'object' && 'id' in data) {
    return data as TransactionResponseDto;
  }

  return null;
};
