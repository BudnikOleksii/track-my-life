import type { FC } from 'react';

import dynamic from 'next/dynamic';

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
  const data = await fetchCategoryBreakdown({
    currencyCode: filters.currencyCode,
    ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
    ...(filters.dateTo && { dateTo: filters.dateTo }),
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  return <CategoryBreakdownChart data={data} />;
};
