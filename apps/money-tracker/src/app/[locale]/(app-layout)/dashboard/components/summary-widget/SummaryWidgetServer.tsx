import type { FC } from 'react';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchSummary } from '../../actions/fetch-summary';
import { SummaryWidget } from './SummaryWidget';

interface SummaryWidgetServerProps {
  filters: DashboardFilters;
  className?: string;
}

export const SummaryWidgetServer: FC<SummaryWidgetServerProps> = async ({ filters, className }) => {
  const data = await fetchSummary({
    currencyCode: filters.currencyCode,
    ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
    ...(filters.dateTo && { dateTo: filters.dateTo }),
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  return <SummaryWidget data={data} currencyCode={filters.currencyCode} className={className} />;
};
