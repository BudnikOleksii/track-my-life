import type { FC } from 'react';

import { convertFilterDateList } from '@track-my-life/shared/src/utils/convert-filter-date-list';

import { getTimezoneOffset } from '@/utils/get-timezone-offset';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchTopCategoryList } from '../../actions/fetch-top-category-list';
import { TOP_CATEGORY_LIST_LIMIT } from '../../constants/dashboard';
import { TopCategoryList } from './TopCategoryList';

interface TopCategoryListServerProps {
  filters: DashboardFilters;
}

export const TopCategoryListServer: FC<TopCategoryListServerProps> = async ({ filters }) => {
  const offset = await getTimezoneOffset();
  const data = await fetchTopCategoryList({
    currencyCode: filters.currencyCode,
    ...convertFilterDateList(filters, offset),
    ...(filters.type !== 'ALL' && { type: filters.type }),
    limit: TOP_CATEGORY_LIST_LIMIT,
  });

  return <TopCategoryList data={data} currencyCode={filters.currencyCode} />;
};
