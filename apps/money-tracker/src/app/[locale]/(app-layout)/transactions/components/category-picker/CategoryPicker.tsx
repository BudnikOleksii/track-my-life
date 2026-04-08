'use client';

import type { CategoryResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { cn } from '@track-my-life/ui/src/lib/utils';
import { ChevronRight } from 'lucide-react';

import type { TransactionType } from '@/constants/transaction';

import styles from './CategoryPicker.module.scss';
import { useCategoryPicker } from './hooks/use-category-picker';

const CHEVRON_SIZE = 16;
const CHEVRON_SMALL_SIZE = 14;

interface CategoryPickerProps {
  categoryList: CategoryResponseDto[];
  transactionType: TransactionType;
  value: string;
  onValueChange: (categoryId: string) => void;
  placeholder?: string;
  error?: boolean;
}

const CategoryPicker: FC<CategoryPickerProps> = ({
  categoryList,
  transactionType,
  value,
  onValueChange,
  placeholder,
  error,
}) => {
  const {
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
  } = useCategoryPicker({ categoryList, transactionType, value, onValueChange });

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={cn(styles.trigger, error && styles.triggerError)}
        onClick={handleToggle}
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
        <div className={styles.picker}>
          <div className={styles.mainList}>
            {mainCategoryList.map((category) => {
              const hasSubcategories = subcategoryMap.has(category.id);
              const isActive = activeCategoryId === category.id;
              const isSelected = selectedMainCategoryId === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isSelected}
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
            <div className={styles.subList}>
              {activeSubcategoryList.map((subcategory) => (
                <button
                  key={subcategory.id}
                  type="button"
                  aria-pressed={value === subcategory.id}
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
