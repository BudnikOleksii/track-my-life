'use client';

import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Link } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@track-my-life/ui/src/components/molecules/alert-dialog/alert-dialog';
import { ArrowLeft, Pause, Pencil, Play, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { PATHS, getRecurringTransactionsEditPath } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { useRecurringTransactionActions } from './hooks/use-recurring-transaction-actions';
import styles from './page.module.scss';

interface RecurringTransactionDetailContentProps {
  recurringTransaction: RecurringTransactionResponseDto;
}

const STATUS_BADGE_VARIANT_MAP = {
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

const formatDateTime = (dateString: string, locale: string): string =>
  new Date(dateString).toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const RecurringTransactionDetailContent: FC<RecurringTransactionDetailContentProps> = ({
  recurringTransaction,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.recurringTransactionsPage);
  const locale = useLocale();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { optimisticTransaction, isPending, handlePause, handleResume, handleDelete } =
    useRecurringTransactionActions({ recurringTransaction, translations });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link
          href={PATHS.recurringTransactions}
          className={styles.backLink}
          aria-label={translations('content.backToList')}
        >
          <ArrowLeft size={20} />
        </Link>
        <Typography variant="title-l">{translations('content.detailTitle')}</Typography>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Typography variant="title-m">
            {optimisticTransaction.currencyCode} {optimisticTransaction.amount}
          </Typography>
          <Badge variant={STATUS_BADGE_VARIANT_MAP[optimisticTransaction.status]}>
            {translations(STATUS_LABEL_KEY[optimisticTransaction.status])}
          </Badge>
        </div>

        <div className={styles.details}>
          <div className={styles.detailRow}>
            <Typography variant="body-s" className={styles.detailLabel}>
              {translations('content.typeLabel')}
            </Typography>
            <Typography variant="body-m">
              {translations(
                `content.${optimisticTransaction.type === 'INCOME' ? 'incomeType' : 'expenseType'}`,
              )}
            </Typography>
          </div>

          <div className={styles.detailRow}>
            <Typography variant="body-s" className={styles.detailLabel}>
              {translations('content.frequencyLabel')}
            </Typography>
            <Typography variant="body-m">
              {translations('content.every', {
                interval: optimisticTransaction.interval,
                frequency: translations(
                  FREQUENCY_LABEL_KEY[optimisticTransaction.frequency],
                ).toLowerCase(),
              })}
            </Typography>
          </div>

          <div className={styles.detailRow}>
            <Typography variant="body-s" className={styles.detailLabel}>
              {translations('content.startDateLabel')}
            </Typography>
            <Typography variant="body-m">
              {formatDate(optimisticTransaction.startDate, locale)}
            </Typography>
          </div>

          <div className={styles.detailRow}>
            <Typography variant="body-s" className={styles.detailLabel}>
              {translations('content.endDateLabel')}
            </Typography>
            <Typography variant="body-m">
              {optimisticTransaction.endDate
                ? formatDate(optimisticTransaction.endDate, locale)
                : translations('content.noEndDate')}
            </Typography>
          </div>

          <div className={styles.detailRow}>
            <Typography variant="body-s" className={styles.detailLabel}>
              {translations('content.nextOccurrenceLabel')}
            </Typography>
            <Typography variant="body-m">
              {formatDate(optimisticTransaction.nextOccurrenceDate, locale)}
            </Typography>
          </div>

          <div className={styles.detailRow}>
            <Typography variant="body-s" className={styles.detailLabel}>
              {translations('content.descriptionLabel')}
            </Typography>
            <Typography variant="body-m">
              {optimisticTransaction.description || translations('content.noDescription')}
            </Typography>
          </div>

          <div className={styles.detailRow}>
            <Typography variant="body-s" className={styles.detailLabel}>
              {translations('content.createdAtLabel')}
            </Typography>
            <Typography variant="body-m">
              {formatDateTime(optimisticTransaction.createdAt, locale)}
            </Typography>
          </div>

          <div className={styles.detailRow}>
            <Typography variant="body-s" className={styles.detailLabel}>
              {translations('content.updatedAtLabel')}
            </Typography>
            <Typography variant="body-m">
              {formatDateTime(optimisticTransaction.updatedAt, locale)}
            </Typography>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        {optimisticTransaction.status === 'ACTIVE' && (
          <Button variant="outline" onClick={handlePause} disabled={isPending}>
            <Pause size={16} />
            {translations('content.pauseButton')}
          </Button>
        )}
        {optimisticTransaction.status === 'PAUSED' && (
          <Button variant="outline" onClick={handleResume} disabled={isPending}>
            <Play size={16} />
            {translations('content.resumeButton')}
          </Button>
        )}
        <Button
          component={Link}
          href={getRecurringTransactionsEditPath(optimisticTransaction.id)}
          variant="outline"
        >
          <Pencil size={16} />
          {translations('content.editButton')}
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            setIsDeleteDialogOpen(true);
          }}
        >
          <Trash2 size={16} />
          {translations('content.deleteButton')}
        </Button>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => !open && setIsDeleteDialogOpen(false)}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{translations('content.deleteButton')}</AlertDialogTitle>
            <AlertDialogDescription>{translations('content.deleteConfirm')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Button variant="outline" type="button">
                {translations('content.cancel')}
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                await handleDelete();
              }}
            >
              <Button variant="destructive">{translations('content.deleteButton')}</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
