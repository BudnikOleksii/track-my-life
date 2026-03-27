'use client';

import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { cn } from '@track-my-life/ui/src/lib/utils';
import { useTranslations } from 'next-intl';

import type { FilterValue } from '@/constants/transaction';

import { FILTER_TO_LABEL_KEY } from '@/constants/filter';
import { FILTER_OPTION_LIST } from '@/constants/transaction';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './TransactionTypeFilter.module.scss';

interface TransactionTypeFilterProps {
  value: FilterValue;
  onValueChange: (value: FilterValue) => void;
}

export const TransactionTypeFilter: FC<TransactionTypeFilterProps> = ({ value, onValueChange }) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);

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
