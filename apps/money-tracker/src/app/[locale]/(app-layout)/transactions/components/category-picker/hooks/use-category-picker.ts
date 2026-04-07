import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { useCallback, useMemo, useState } from 'react';

import type { TransactionType } from '@/constants/transaction';

interface UseCategoryPickerParams {
  categoryList: CategoryResponseDto[];
  transactionType: TransactionType;
  value: string;
  onValueChange: (categoryId: string) => void;
}

const useCategoryData = (
  categoryList: CategoryResponseDto[],
  transactionType: TransactionType,
  value: string,
) => {
  const mainCategoryList = useMemo(
    () =>
      categoryList.filter(
        (item) => item.parentCategoryId === null && item.type === transactionType,
      ),
    [categoryList, transactionType],
  );

  const subcategoryMap = useMemo(() => {
    const map = new Map<string, CategoryResponseDto[]>();
    for (const category of categoryList) {
      if (category.parentCategoryId !== null && category.type === transactionType) {
        const existing = map.get(category.parentCategoryId) ?? [];
        existing.push(category);
        map.set(category.parentCategoryId, existing);
      }
    }
    return map;
  }, [categoryList, transactionType]);

  const selectedCategory = useMemo(
    () => categoryList.find((item) => item.id === value) ?? null,
    [categoryList, value],
  );

  const selectedDisplayName = useMemo(() => {
    if (!selectedCategory) {
      return '';
    }
    if (selectedCategory.parentCategoryId) {
      const parent = categoryList.find((item) => item.id === selectedCategory.parentCategoryId);
      return parent ? `${parent.name} / ${selectedCategory.name}` : selectedCategory.name;
    }
    return selectedCategory.name;
  }, [selectedCategory, categoryList]);

  const selectedMainCategoryId = selectedCategory?.parentCategoryId ?? selectedCategory?.id ?? null;

  return { mainCategoryList, subcategoryMap, selectedDisplayName, selectedMainCategoryId };
};

export const useCategoryPicker = ({
  categoryList,
  transactionType,
  value,
  onValueChange,
}: UseCategoryPickerParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const { mainCategoryList, subcategoryMap, selectedDisplayName, selectedMainCategoryId } =
    useCategoryData(categoryList, transactionType, value);

  const activeSubcategoryList = useMemo(
    () => (activeCategoryId ? (subcategoryMap.get(activeCategoryId) ?? []) : []),
    [activeCategoryId, subcategoryMap],
  );

  const hasActiveSubcategories = activeSubcategoryList.length > EMPTY_LIST_LENGTH;

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleMainCategoryClick = useCallback(
    (categoryId: string) => {
      setActiveCategoryId(categoryId);
      const hasSubcategories = subcategoryMap.has(categoryId);
      if (!hasSubcategories) {
        onValueChange(categoryId);
        setIsOpen(false);
      }
    },
    [subcategoryMap, onValueChange],
  );

  const handleSubcategoryClick = useCallback(
    (categoryId: string) => {
      onValueChange(categoryId);
      setIsOpen(false);
    },
    [onValueChange],
  );

  return {
    isOpen,
    mainCategoryList,
    subcategoryMap,
    activeSubcategoryList,
    hasActiveSubcategories,
    activeCategoryId,
    selectedDisplayName,
    selectedMainCategoryId,
    handleToggle,
    handleMainCategoryClick,
    handleSubcategoryClick,
  };
};
