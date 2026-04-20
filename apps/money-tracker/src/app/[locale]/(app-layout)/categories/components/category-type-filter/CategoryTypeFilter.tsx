'use client';

import type { FC } from 'react';

import type { FilterValue } from '@/constants/transaction';

import { TypeFilter } from '@/components/type-filter/TypeFilter';

import { useCategoryFilters } from '../../hooks/use-category-filters';

interface CategoryTypeFilterProps {
  ariaLabel: string;
  labelMap: Record<FilterValue, string>;
}

export const CategoryTypeFilter: FC<CategoryTypeFilterProps> = ({ ariaLabel, labelMap }) => {
  const { activeFilter, handleFilterChange } = useCategoryFilters();

  return (
    <TypeFilter
      value={activeFilter}
      onValueChange={handleFilterChange}
      ariaLabel={ariaLabel}
      labelMap={labelMap}
    />
  );
};
