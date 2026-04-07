import type { FC } from 'react';

import { convertFilterDateList } from '@track-my-life/shared/src/utils/convert-filter-date-list';
import dynamic from 'next/dynamic';

import { getTimezoneOffset } from '@/utils/get-timezone-offset';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchCategoryBreakdown } from '../../actions/fetch-category-breakdown';

const CategoryBreakdownChart = dynamic(() =>
  import('./CategoryBreakdownChart').then((mod) => mod.CategoryBreakdownChart),
);

interface CategoryBreakdownChartServerProps {
  filters: DashboardFilters;
}

export const CategoryBreakdownChartServer: FC<CategoryBreakdownChartServerProps> = async ({
  filters,
}) => {
  const offset = await getTimezoneOffset();
  const data = await fetchCategoryBreakdown({
    currencyCode: filters.currencyCode,
    ...convertFilterDateList(filters, offset),
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  return <CategoryBreakdownChart data={data} />;
};
