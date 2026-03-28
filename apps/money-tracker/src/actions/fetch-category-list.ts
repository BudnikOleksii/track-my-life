import type {
  CategoryListResponseDto,
  CategoryResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscCategoryApiService } from '@track-my-life/shared/src/api/rsc-api';

const MAX_PAGE_SIZE = 100;

const checkIsCategoryListResponse = (value: unknown): value is CategoryListResponseDto =>
  typeof value === 'object' &&
  value !== null &&
  'data' in value &&
  Array.isArray((value as Record<string, unknown>).data);

export const fetchCategoryList = async (): Promise<CategoryResponseDto[]> => {
  const { data } = await rscCategoryApiService.fetchCategoryList({ pageSize: MAX_PAGE_SIZE });

  if (checkIsCategoryListResponse(data)) {
    return data.data;
  }

  return [];
};
