'use client';

import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
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
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { deleteRecurringTransaction } from '../../actions/delete-recurring-transaction';

interface DeleteRecurringTransactionDialogProps {
  recurringTransaction: RecurringTransactionResponseDto | null;
  onClose: () => void;
  onSuccess: (id: string) => void;
}

export const DeleteRecurringTransactionDialog: FC<DeleteRecurringTransactionDialogProps> = ({
  recurringTransaction,
  onClose,
  onSuccess,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.recurringTransactionsPage);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = useCallback(async () => {
    if (!recurringTransaction) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteRecurringTransaction(recurringTransaction.id);
      if (result.ok) {
        onSuccess(recurringTransaction.id);
      } else {
        toast.error(translations('content.deleteError'));
      }
    } finally {
      setIsDeleting(false);
    }
  }, [recurringTransaction, onSuccess, translations]);

  return (
    <AlertDialog open={Boolean(recurringTransaction)} onOpenChange={(open) => !open && onClose()}>
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
              await handleConfirm();
            }}
          >
            <Button variant="destructive" disabled={isDeleting}>
              {translations('content.deleteButton')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
