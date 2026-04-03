import type { TransactionsByCategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscTransactionApiService } from '@track-my-life/shared/src/api/rsc-api';

export const fetchTransactionsByCategory = async (
  categoryId: string,
): Promise<TransactionsByCategoryResponseDto | null> => {
  const { data } = await rscTransactionApiService.fetchTransactionsByCategory(categoryId);

  if (data && typeof data === 'object' && 'groups' in data && Array.isArray(data.groups)) {
    return data as TransactionsByCategoryResponseDto;
  }

  return null;
};
