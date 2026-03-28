import type { FilterValue } from '@/constants/transaction';

import { normalizeParam } from '@/constants/normalize-param';
import { FILTER_OPTION_LIST } from '@/constants/transaction';

export const SEARCH_PARAM_KEY = {
  TYPE: 'type',
} as const;

const VALID_TYPE_SET = new Set<FilterValue>(FILTER_OPTION_LIST);

const checkIsValidFilterType = (value: string): value is FilterValue =>
  VALID_TYPE_SET.has(value as FilterValue);

export const parseCategorySearchParams = (
  searchParams: Record<string, string | string[] | undefined>,
) => {
  const rawType = normalizeParam(searchParams[SEARCH_PARAM_KEY.TYPE]);

  return {
    type: checkIsValidFilterType(rawType) ? rawType : ('ALL' as FilterValue),
  };
};
