import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscCategoryApiService } from '@track-my-life/next-shared/src/api/rsc-api';

export const fetchCategory = async (id: string): Promise<CategoryResponseDto | null> => {
  const { data } = await rscCategoryApiService.fetchCategoryById(id);

  if (data && typeof data === 'object' && 'id' in data) {
    return data as CategoryResponseDto;
  }

  return null;
};
