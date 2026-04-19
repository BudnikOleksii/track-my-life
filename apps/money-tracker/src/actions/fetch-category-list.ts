import type {
  CategoryListResponseDto,
  CategoryResponseDto,
  TransactionType,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { rscCategoryApiService } from '@track-my-life/next-shared/src/api/rsc-api';
import { checkIsObject } from '@track-my-life/shared/src/constants/type-guard';
import { cache } from 'react';

import { CATEGORIES_CACHE } from '@/constants/cache-tag';

const MAX_PAGE_SIZE = 100;

const checkIsCategoryListResponse = (value: unknown): value is CategoryListResponseDto =>
  checkIsObject(value) && 'data' in value && Array.isArray(value.data);

export const fetchCategoryList = cache(
  async (type?: TransactionType): Promise<CategoryResponseDto[]> => {
    const { data } = await rscCategoryApiService.fetchCategoryList(
      { pageSize: MAX_PAGE_SIZE, ...(type && { type }) },
      CATEGORIES_CACHE,
    );

    if (checkIsCategoryListResponse(data)) {
      return data.data;
    }

    return [];
  },
);
