'use client';

import type {
  RecurringTransactionResponseDto,
  RecurringTransactionStatus,
} from '@track-my-life/shared/src/api/generated/types.gen';
import type { BadgeVariant } from '@track-my-life/ui/src/components/atoms/badge/badge';
import type { FC } from 'react';

import { Link, useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { formatAmount } from '@track-my-life/shared/src/utils/format-amount';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Pencil, Repeat, Trash2, Pause, Play } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

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

const DATE_PARTS_COUNT = 3;
const YEAR_INDEX = 0;
const MONTH_INDEX = 1;
const DAY_INDEX = 2;
const MONTH_OFFSET = 1;
const DATE_PART_INDEX = 0;

const parseDateString = (dateString: string): Date => {
  const datePart = dateString.split('T')[DATE_PART_INDEX] ?? dateString;
  const parts = datePart.split('-');
  if (parts.length >= DATE_PARTS_COUNT) {
    return new Date(
      Number(parts[YEAR_INDEX]),
      Number(parts[MONTH_INDEX]) - MONTH_OFFSET,
      Number(parts[DAY_INDEX]),
    );
  }
  return new Date(dateString);
};

const formatDate = (dateString: string, locale: string): string =>
  parseDateString(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const RecurringTransactionList: FC<RecurringTransactionListProps> = ({
  recurringTransactionList,
  onDelete,
  onPause,
  onResume,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.recurringTransactionsPage);
  const locale = useLocale();
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
        <div key={item.id} className={styles.row}>
          <Link href={getRecurringTransactionsDetailPath(item.id)} className={styles.info}>
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
                  date: formatDate(item.nextOccurrenceDate, locale),
                })}
              </Typography>
            </div>
            {item.description && (
              <Typography variant="body-s" className={styles.description}>
                {item.description}
              </Typography>
            )}
          </Link>
          <div className={styles.actions}>
            {item.status === 'ACTIVE' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
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
                onClick={() => {
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
              onClick={() => {
                router.push(getRecurringTransactionsEditPath(item.id));
              }}
              aria-label={translations('content.editButton')}
            >
              <Pencil size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onDelete(item);
              }}
              aria-label={translations('content.deleteButton')}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
