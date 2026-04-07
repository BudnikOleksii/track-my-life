import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface UseUrlFiltersConfig<TUpdate> {
  filterKeyToSearchParam: Record<keyof TUpdate, string>;
  pageResetKeySet?: Set<string>;
  defaultPage?: number;
  pageParamKey?: string;
}

const DEFAULT_PAGE_PARAM_KEY = 'page';
const CLEAR_VALUE_SET = new Set<unknown>([undefined, '', 'ALL']);

const buildSearchParams = <TUpdate extends object>(
  searchParams: URLSearchParams,
  update: TUpdate,
  filterKeyToSearchParam: Record<keyof TUpdate, string>,
) => {
  const params = new URLSearchParams(searchParams.toString());

  for (const [key, value] of Object.entries(update)) {
    const paramKey = filterKeyToSearchParam[key as keyof TUpdate];

    if (CLEAR_VALUE_SET.has(value)) {
      params.delete(paramKey);
    } else {
      params.set(paramKey, String(value));
    }
  }

  return params;
};

interface PageResetConfig {
  params: URLSearchParams;
  update: object;
  pageResetKeySet: Set<string>;
  defaultPage: number;
  pageParamKey: string;
}

const applyPageReset = ({
  params,
  update,
  pageResetKeySet,
  defaultPage,
  pageParamKey,
}: PageResetConfig) => {
  const shouldReset = Object.keys(update).some((key) => pageResetKeySet.has(key));

  if (
    shouldReset &&
    !(pageParamKey in update && (update as Record<string, unknown>)[pageParamKey])
  ) {
    params.set(pageParamKey, String(defaultPage));
  }
};

export const useUrlFilters = <TUpdate extends object>({
  filterKeyToSearchParam,
  pageResetKeySet,
  defaultPage,
  pageParamKey = DEFAULT_PAGE_PARAM_KEY,
}: UseUrlFiltersConfig<TUpdate>) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = useCallback(
    (update: TUpdate) => {
      const params = buildSearchParams(searchParams, update, filterKeyToSearchParam);

      if (pageResetKeySet && defaultPage !== undefined) {
        applyPageReset({ params, update, pageResetKeySet, defaultPage, pageParamKey });
      }

      const queryString = params.toString();
      router.replace(queryString ? `?${queryString}` : '?', { scroll: false });
    },
    [searchParams, router, filterKeyToSearchParam, pageResetKeySet, defaultPage, pageParamKey],
  );

  return { handleFilterChange };
};
