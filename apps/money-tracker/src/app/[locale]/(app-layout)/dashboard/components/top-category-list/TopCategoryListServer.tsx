import type { FC } from 'react';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchTopCategoryList } from '../../actions/fetch-top-category-list';
import { TOP_CATEGORY_LIST_LIMIT } from '../../constants/dashboard';
import { TopCategoryList } from './TopCategoryList';

interface TopCategoryListServerProps {
  filters: DashboardFilters;
}

export const TopCategoryListServer: FC<TopCategoryListServerProps> = async ({ filters }) => {
  const data = await fetchTopCategoryList({
    currencyCode: filters.currencyCode,
    ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
    ...(filters.dateTo && { dateTo: filters.dateTo }),
    ...(filters.type !== 'ALL' && { type: filters.type }),
    limit: TOP_CATEGORY_LIST_LIMIT,
  });

  return <TopCategoryList data={data} currencyCode={filters.currencyCode} />;
};
