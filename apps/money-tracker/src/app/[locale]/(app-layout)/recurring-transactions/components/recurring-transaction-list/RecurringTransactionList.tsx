'use client';

import type {
  RecurringTransactionResponseDto,
  RecurringTransactionStatus,
} from '@track-my-life/shared/src/api/generated/types.gen';
import type { BadgeVariant } from '@track-my-life/ui/src/components/atoms/badge/badge';
import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Link, useRouter } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Pencil, Repeat, Trash2, Pause, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  getRecurringTransactionsDetailPath,
  getRecurringTransactionsEditPath,
} from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './RecurringTransactionList.module.scss';

interface RecurringTransactionListProps {
  recurringTransactionList: RecurringTransactionResponseDto[];
  onDelete: (recurringTransaction: RecurringTransactionResponseDto) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
}

const STATUS_BADGE_VARIANT_MAP: Record<RecurringTransactionStatus, BadgeVariant> = {
  ACTIVE: 'success',
  PAUSED: 'warning',
  CANCELLED: 'destructive',
} as const;

const FREQUENCY_LABEL_KEY = {
  DAILY: 'content.dailyFrequency',
  WEEKLY: 'content.weeklyFrequency',
  MONTHLY: 'content.monthlyFrequency',
  YEARLY: 'content.yearlyFrequency',
} as const;

const STATUS_LABEL_KEY = {
  ACTIVE: 'content.activeStatus',
  PAUSED: 'content.pausedStatus',
  CANCELLED: 'content.cancelledStatus',
} as const;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatAmount = (amount: string, currencyCode: string): string => `${currencyCode} ${amount}`;

export const RecurringTransactionList: FC<RecurringTransactionListProps> = ({
  recurringTransactionList,
  onDelete,
  onPause,
  onResume,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.recurringTransactionsPage);
  const router = useRouter();

  if (recurringTransactionList.length === EMPTY_LIST_LENGTH) {
    return (
      <div className={styles.empty}>
        <Repeat size={48} className={styles.emptyIcon} />
        <Typography variant="body-m" className={styles.emptyText}>
          {translations('content.noRecurringTransactions')}
        </Typography>
        <Typography variant="body-s" className={styles.emptyHint}>
          {translations('content.noRecurringTransactionsHint')}
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {recurringTransactionList.map((item) => (
        <Link
          key={item.id}
          href={getRecurringTransactionsDetailPath(item.id)}
          className={styles.row}
        >
          <div className={styles.info}>
            <div className={styles.primary}>
              <Typography variant="body-m" className={styles.amount}>
                {formatAmount(item.amount, item.currencyCode)}
              </Typography>
              <Badge variant={STATUS_BADGE_VARIANT_MAP[item.status]}>
                {translations(STATUS_LABEL_KEY[item.status])}
              </Badge>
            </div>
            <div className={styles.secondary}>
              <Typography variant="body-s" className={styles.frequency}>
                {translations('content.every', {
                  interval: item.interval,
                  frequency: translations(FREQUENCY_LABEL_KEY[item.frequency]).toLowerCase(),
                })}
              </Typography>
              <Typography variant="body-s" className={styles.nextDate}>
                {translations('content.nextOccurrence', {
                  date: formatDate(item.nextOccurrenceDate),
                })}
              </Typography>
            </div>
            {item.description && (
              <Typography variant="body-s" className={styles.description}>
                {item.description}
              </Typography>
            )}
          </div>
          <div className={styles.actions}>
            {item.status === 'ACTIVE' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(event) => {
                  event.preventDefault();
                  onPause(item.id);
                }}
                aria-label={translations('content.pauseButton')}
              >
                <Pause size={14} />
              </Button>
            )}
            {item.status === 'PAUSED' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(event) => {
                  event.preventDefault();
                  onResume(item.id);
                }}
                aria-label={translations('content.resumeButton')}
              >
                <Play size={14} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(event) => {
                event.stopPropagation();
                router.push(getRecurringTransactionsEditPath(item.id));
              }}
              aria-label={translations('content.editButton')}
            >
              <Pencil size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(item);
              }}
              aria-label={translations('content.deleteButton')}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
};
