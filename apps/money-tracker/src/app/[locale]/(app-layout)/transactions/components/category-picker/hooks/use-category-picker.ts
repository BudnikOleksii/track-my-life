import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { TransactionType } from '@/constants/transaction';

interface UseCategoryPickerParams {
  categoryList: CategoryResponseDto[];
  transactionType: TransactionType | '';
  value: string;
  onValueChange: (categoryId: string) => void;
  showAllOption?: boolean | undefined;
  allCategoriesLabel?: string | undefined;
}

interface UseCategoryDataParams {
  categoryList: CategoryResponseDto[];
  transactionType: TransactionType | '';
  value: string;
  showAllOption?: boolean | undefined;
  allCategoriesLabel?: string | undefined;
}

const useCategoryData = ({
  categoryList,
  transactionType,
  value,
  showAllOption,
  allCategoriesLabel,
}: UseCategoryDataParams) => {
  const checkMatchesType = useCallback(
    (item: CategoryResponseDto) => !transactionType || item.type === transactionType,
    [transactionType],
  );

  const mainCategoryList = useMemo(
    () => categoryList.filter((item) => item.parentCategoryId === null && checkMatchesType(item)),
    [categoryList, checkMatchesType],
  );

  const subcategoryMap = useMemo(() => {
    const map = new Map<string, CategoryResponseDto[]>();
    for (const category of categoryList) {
      if (category.parentCategoryId !== null && checkMatchesType(category)) {
        const existing = map.get(category.parentCategoryId) ?? [];
        existing.push(category);
        map.set(category.parentCategoryId, existing);
      }
    }
    return map;
  }, [categoryList, checkMatchesType]);

  const selectedCategory = useMemo(
    () => categoryList.find((item) => item.id === value && checkMatchesType(item)) ?? null,
    [categoryList, value, checkMatchesType],
  );

  const selectedDisplayName = useMemo(() => {
    if (showAllOption && value === '' && allCategoriesLabel) {
      return allCategoriesLabel;
    }
    if (!selectedCategory) {
      return '';
    }
    if (selectedCategory.parentCategoryId) {
      const parent = categoryList.find((item) => item.id === selectedCategory.parentCategoryId);
      return parent ? `${parent.name} / ${selectedCategory.name}` : selectedCategory.name;
    }
    return selectedCategory.name;
  }, [selectedCategory, categoryList, value, showAllOption, allCategoriesLabel]);

  const selectedMainCategoryId = selectedCategory?.parentCategoryId ?? selectedCategory?.id ?? null;

  return { mainCategoryList, subcategoryMap, selectedDisplayName, selectedMainCategoryId };
};

export const useCategoryPicker = ({
  categoryList,
  transactionType,
  value,
  onValueChange,
  showAllOption,
  allCategoriesLabel,
}: UseCategoryPickerParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const { mainCategoryList, subcategoryMap, selectedDisplayName, selectedMainCategoryId } =
    useCategoryData({ categoryList, transactionType, value, showAllOption, allCategoriesLabel });

  const activeSubcategoryList = useMemo(
    () => (activeCategoryId ? (subcategoryMap.get(activeCategoryId) ?? []) : []),
    [activeCategoryId, subcategoryMap],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveCategoryId(selectedMainCategoryId);

    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, selectedMainCategoryId]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelectAndClose = useCallback(
    (categoryId: string) => {
      onValueChange(categoryId);
      setIsOpen(false);
    },
    [onValueChange],
  );

  const handleMainCategoryClick = useCallback(
    (categoryId: string) => {
      setActiveCategoryId(categoryId);
      if (!subcategoryMap.has(categoryId)) {
        handleSelectAndClose(categoryId);
      }
    },
    [subcategoryMap, handleSelectAndClose],
  );

  return {
    isOpen,
    rootRef,
    mainCategoryList,
    subcategoryMap,
    activeSubcategoryList,
    hasActiveSubcategories: activeSubcategoryList.length > EMPTY_LIST_LENGTH,
    activeCategoryId,
    selectedDisplayName,
    selectedMainCategoryId,
    handleToggle,
    handleMainCategoryClick,
    handleSubcategoryClick: handleSelectAndClose,
    handleAllCategoriesClick: handleSelectAndClose,
    handleActivateCategory: setActiveCategoryId,
  };
};
