import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { rscCategoryApiService } from '@track-my-life/next-shared/src/api/rsc-api';

export const fetchCategory = async (id: string): Promise<CategoryResponseDto | null> => {
  const result = await rscCategoryApiService.fetchCategoryById(id);

  return result.ok ? result.data : null;
};
