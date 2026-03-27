'use client';

import type { TransactionType } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { cn } from '@track-my-life/ui/src/lib/utils';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './CategoryTypeFilter.module.scss';

export type FilterValue = 'ALL' | TransactionType;

interface CategoryTypeFilterProps {
  value: FilterValue;
  onValueChange: (value: FilterValue) => void;
}

const FILTER_OPTION_LIST: FilterValue[] = ['ALL', 'INCOME', 'EXPENSE'];

const FILTER_TO_LABEL_KEY: Record<FilterValue, string> = {
  ALL: 'content.allTypes',
  INCOME: 'content.incomeType',
  EXPENSE: 'content.expenseType',
};

export const CategoryTypeFilter: FC<CategoryTypeFilterProps> = ({ value, onValueChange }) => {
  const translations = useTranslations(I18N_NAMESPACE.categoriesPage);

  return (
    <div className={styles.filter} role="group" aria-label={translations('content.filterByType')}>
      {FILTER_OPTION_LIST.map((option) => (
        <Button
          key={option}
          variant={value === option ? 'primary' : 'outline'}
          size="sm"
          aria-pressed={value === option}
          onClick={() => {
            onValueChange(option);
          }}
          className={cn(styles.button, value === option && styles.active)}
        >
          {translations(FILTER_TO_LABEL_KEY[option])}
        </Button>
      ))}
    </div>
  );
};
