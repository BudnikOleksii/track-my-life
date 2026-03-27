'use client';

import type { FC } from 'react';

import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './TransactionDateFilter.module.scss';

interface TransactionDateFilterProps {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

export const TransactionDateFilter: FC<TransactionDateFilterProps> = ({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);

  return (
    <div className={styles.filter}>
      <Input
        type="date"
        value={dateFrom}
        onChange={(event) => {
          onDateFromChange(event.target.value);
        }}
        aria-label={translations('content.dateFrom')}
      />
      <Input
        type="date"
        value={dateTo}
        onChange={(event) => {
          onDateToChange(event.target.value);
        }}
        aria-label={translations('content.dateTo')}
      />
    </div>
  );
};
