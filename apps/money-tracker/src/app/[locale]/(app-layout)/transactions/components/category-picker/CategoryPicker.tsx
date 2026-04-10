'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { cn } from '@track-my-life/ui/src/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';

import type { TransactionType } from '@/constants/transaction';

import styles from './CategoryPicker.module.scss';
import { useCategoryPicker } from './hooks/use-category-picker';

const CHEVRON_SIZE = 16;
const CHEVRON_SMALL_SIZE = 14;
const MAIN_LIST_INDEX = 0;
const SUBCATEGORY_LIST_INDEX = 1;

const getArrowFocusTarget = (
  key: string,
  target: HTMLElement,
  pickerElement: HTMLDivElement,
): HTMLElement | null => {
  if (key === 'ArrowDown' || key === 'ArrowUp') {
    const sibling = key === 'ArrowDown' ? target.nextElementSibling : target.previousElementSibling;
    return sibling instanceof HTMLElement ? sibling : null;
  }

  if (key === 'ArrowRight' || key === 'ArrowLeft') {
    const listboxList = pickerElement.querySelectorAll<HTMLElement>('[role="listbox"]');
    const targetBox =
      key === 'ArrowRight' ? listboxList[SUBCATEGORY_LIST_INDEX] : listboxList[MAIN_LIST_INDEX];
    return targetBox?.querySelector<HTMLElement>('[role="option"]') ?? null;
  }

  return null;
};

interface CategoryPickerProps {
  categoryList: CategoryResponseDto[];
  transactionType: TransactionType | '';
  value: string;
  onValueChange: (categoryId: string) => void;
  placeholder?: string;
  error?: boolean;
  showAllOption?: boolean;
  allCategoriesLabel?: string;
  allParentLabel?: string;
}

const CategoryPicker: FC<CategoryPickerProps> = ({
  categoryList,
  transactionType,
  value,
  onValueChange,
  placeholder,
  error,
  showAllOption,
  allCategoriesLabel,
  allParentLabel,
}) => {
  const {
    isOpen,
    rootRef,
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
    handleAllCategoriesClick,
  } = useCategoryPicker({
    categoryList,
    transactionType,
    value,
    onValueChange,
    showAllOption,
    allCategoriesLabel,
  });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !pickerRef.current) {
      return;
    }
    const selected = pickerRef.current.querySelector<HTMLElement>('[aria-selected="true"]');
    const firstOption = pickerRef.current.querySelector<HTMLElement>('[role="option"]');
    (selected ?? firstOption)?.focus();
  }, [isOpen]);

  const handlePickerKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleToggle();
        triggerRef.current?.focus();
        return;
      }

      const target = event.target as HTMLElement;
      const focusTarget =
        target.getAttribute('role') === 'option' && pickerRef.current
          ? getArrowFocusTarget(event.key, target, pickerRef.current)
          : null;
      if (focusTarget) {
        event.preventDefault();
        focusTarget.focus();
      }
    },
    [handleToggle],
  );

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className={cn(styles.trigger, error && styles.triggerError)}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn(!selectedDisplayName && styles.placeholder)}>
          {selectedDisplayName || placeholder}
        </span>
        <ChevronRight
          size={CHEVRON_SIZE}
          className={cn(styles.chevron, isOpen && styles.chevronOpen)}
        />
      </button>

      {isOpen && (
        <div ref={pickerRef} className={styles.picker} onKeyDown={handlePickerKeyDown}>
          <div className={styles.mainList} role="listbox">
            {showAllOption && allCategoriesLabel && (
              <button
                type="button"
                role="option"
                aria-selected={value === ''}
                className={cn(styles.categoryItem, value === '' && styles.categoryItemSelected)}
                onClick={() => {
                  handleAllCategoriesClick('');
                }}
              >
                <span className={styles.categoryName}>{allCategoriesLabel}</span>
              </button>
            )}
            {mainCategoryList.map((category) => {
              const hasSubcategories = subcategoryMap.has(category.id);
              const isActive = activeCategoryId === category.id;
              const isSelected = selectedMainCategoryId === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    styles.categoryItem,
                    isActive && styles.categoryItemActive,
                    isSelected && styles.categoryItemSelected,
                  )}
                  onClick={() => {
                    handleMainCategoryClick(category.id);
                  }}
                >
                  <span className={styles.categoryName}>{category.name}</span>
                  {hasSubcategories && (
                    <ChevronRight size={CHEVRON_SMALL_SIZE} className={styles.itemChevron} />
                  )}
                </button>
              );
            })}
          </div>

          {hasActiveSubcategories && (
            <div className={styles.subList} role="listbox">
              {showAllOption && activeCategoryId && allParentLabel && (
                <button
                  type="button"
                  role="option"
                  aria-selected={value === activeCategoryId}
                  className={cn(
                    styles.categoryItem,
                    value === activeCategoryId && styles.categoryItemSelected,
                  )}
                  onClick={() => {
                    if (activeCategoryId) {
                      handleAllCategoriesClick(activeCategoryId);
                    }
                  }}
                >
                  <span className={styles.categoryName}>
                    {allParentLabel}{' '}
                    {mainCategoryList.find((cat) => cat.id === activeCategoryId)?.name}
                  </span>
                </button>
              )}
              {activeSubcategoryList.map((subcategory) => (
                <button
                  key={subcategory.id}
                  type="button"
                  role="option"
                  aria-selected={value === subcategory.id}
                  className={cn(
                    styles.categoryItem,
                    value === subcategory.id && styles.categoryItemSelected,
                  )}
                  onClick={() => {
                    handleSubcategoryClick(subcategory.id);
                  }}
                >
                  <span className={styles.categoryName}>{subcategory.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { CategoryPicker };
