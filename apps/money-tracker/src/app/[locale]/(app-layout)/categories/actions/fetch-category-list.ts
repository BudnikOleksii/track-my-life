'use server';

import type { TransactionType } from '@track-my-life/shared/src/api/generated/types.gen';

import { categoryApiService } from '@track-my-life/shared/src/api/server-api';

export interface CategoryItemDto {
  id: string;
  name: string;
  type: TransactionType;
  parentCategoryId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CategoryListResponseDto {
  data: CategoryItemDto[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

const MAX_PAGE_SIZE = 100;

const checkIsCategoryListResponse = (value: unknown): value is CategoryListResponseDto =>
  typeof value === 'object' &&
  value !== null &&
  'data' in value &&
  Array.isArray((value as Record<string, unknown>).data);

export const fetchCategoryList = async (): Promise<CategoryItemDto[]> => {
  const { data } = await categoryApiService.fetchCategoryList({ pageSize: MAX_PAGE_SIZE });

  if (checkIsCategoryListResponse(data)) {
    return data.data;
  }

  return [];
};
