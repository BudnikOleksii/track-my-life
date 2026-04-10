'use client';

import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { cn } from '@track-my-life/ui/src/lib/utils';

import type { FilterValue } from '@/constants/transaction';

import { FILTER_OPTION_LIST } from '@/constants/transaction';

import styles from './TypeFilter.module.scss';

interface TypeFilterProps {
  value: FilterValue;
  onValueChange: (value: FilterValue) => void;
  ariaLabel: string;
  labelMap: Record<FilterValue, string>;
}

export const TypeFilter: FC<TypeFilterProps> = ({ value, onValueChange, ariaLabel, labelMap }) => (
  <div className={styles.filter} role="group" aria-label={ariaLabel}>
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
        {labelMap[option]}
      </Button>
    ))}
  </div>
);
