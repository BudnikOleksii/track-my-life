import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { useEffect, useMemo, useState } from 'react';

import { fetchCategoryList } from '@/actions/fetch-category-list';

export const useCategoryList = (isOpen: boolean, selectedType: string) => {
  const [categoryList, setCategoryList] = useState<CategoryResponseDto[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchCategoryList()
        .then(setCategoryList)
        .catch(() => setCategoryList([]));
    }
  }, [isOpen]);

  const categoryOptionList = useMemo(
    () =>
      categoryList
        .filter((item) => item.type === selectedType)
        .map((item) => ({ value: item.id, label: item.name })),
    [categoryList, selectedType],
  );

  return { categoryOptionList };
};
