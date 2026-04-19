'use client';

import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC, ReactNode } from 'react';

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
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { PATHS, getRecurringTransactionsEditPath } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import {
  STATUS_BADGE_VARIANT_MAP,
  STATUS_LABEL_KEY,
} from '../constants/recurring-transaction-display';
import { useRecurringTransactionActions } from './hooks/use-recurring-transaction-actions';
import styles from './page.module.scss';

interface RecurringTransactionDetailContentProps {
  recurringTransaction: RecurringTransactionResponseDto;
  children: ReactNode;
}

export const RecurringTransactionDetailContent: FC<RecurringTransactionDetailContentProps> = ({
  recurringTransaction,
  children,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.recurringTransactionsPage);
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

        {children}
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
