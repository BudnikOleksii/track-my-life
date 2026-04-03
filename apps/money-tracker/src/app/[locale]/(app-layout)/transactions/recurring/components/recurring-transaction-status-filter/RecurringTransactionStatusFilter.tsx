'use client';

import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { cn } from '@track-my-life/ui/src/lib/utils';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { RecurringTransactionFilterStatus } from '../../constants/recurring-transaction-list';

import { STATUS_FILTER_OPTION_LIST } from '../../constants/recurring-transaction-list';
import styles from './RecurringTransactionStatusFilter.module.scss';

interface RecurringTransactionStatusFilterProps {
  value: RecurringTransactionFilterStatus;
  onValueChange: (value: RecurringTransactionFilterStatus) => void;
}

const STATUS_LABEL_KEY: Record<RecurringTransactionFilterStatus, string> = {
  ALL: 'content.allStatuses',
  ACTIVE: 'content.activeStatus',
  PAUSED: 'content.pausedStatus',
  CANCELLED: 'content.cancelledStatus',
};

export const RecurringTransactionStatusFilter: FC<RecurringTransactionStatusFilterProps> = ({
  value,
  onValueChange,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.recurringTransactionsPage);

  return (
    <div className={styles.filter} role="group" aria-label={translations('content.filterByStatus')}>
      {STATUS_FILTER_OPTION_LIST.map((option) => (
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
          {translations(STATUS_LABEL_KEY[option])}
        </Button>
      ))}
    </div>
  );
};
