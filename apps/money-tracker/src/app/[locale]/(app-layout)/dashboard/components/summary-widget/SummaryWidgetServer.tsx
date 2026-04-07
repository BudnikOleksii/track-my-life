import type { FC } from 'react';

import { convertFilterDateList } from '@track-my-life/shared/src/utils/convert-filter-date-list';

import { getTimezoneOffset } from '@/utils/get-timezone-offset';

import type { DashboardFilters } from '../../constants/dashboard';

import { fetchSummary } from '../../actions/fetch-summary';
import { SummaryWidget } from './SummaryWidget';

interface SummaryWidgetServerProps {
  filters: DashboardFilters;
  className?: string | undefined;
}

export const SummaryWidgetServer: FC<SummaryWidgetServerProps> = async ({ filters, className }) => {
  const offset = await getTimezoneOffset();
  const data = await fetchSummary({
    currencyCode: filters.currencyCode,
    ...convertFilterDateList(filters, offset),
    ...(filters.type !== 'ALL' && { type: filters.type }),
  });

  return <SummaryWidget data={data} currencyCode={filters.currencyCode} className={className} />;
};
