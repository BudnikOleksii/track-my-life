import { useEffect, useRef, useState } from 'react';

interface WidgetDataState<T> {
  data: T | null;
  isLoading: boolean;
}

export const useWidgetData = <T>(
  fetchFn: () => Promise<T | null>,
  cacheKey: string,
): WidgetDataState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      setIsLoading(true);
      const result = await fetchFnRef.current();

      if (!isCancelled) {
        setData(result);
        setIsLoading(false);
      }
    };

    load();

    return () => {
      isCancelled = true;
    };
  }, [cacheKey]);

  return { data, isLoading };
};
