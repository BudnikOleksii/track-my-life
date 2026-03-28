'use client';

import type { FC } from 'react';

import type { DashboardFilters } from '../../constants/dashboard';

import { useDashboardFilters } from '../../hooks/use-dashboard-filters';
import { DashboardFilterBar } from './DashboardFilterBar';

interface DashboardFilterBarClientProps {
  filters: DashboardFilters;
}

export const DashboardFilterBarClient: FC<DashboardFilterBarClientProps> = ({ filters }) => {
  const { handleFilterChange } = useDashboardFilters();

  return <DashboardFilterBar filters={filters} onFilterChange={handleFilterChange} />;
};
