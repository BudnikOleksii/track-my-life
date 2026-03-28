import type { FC } from 'react';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchCategoryBreakdown } from '../../actions/fetch-category-breakdown';
import { CategoryBreakdownChart } from './CategoryBreakdownChart';

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
