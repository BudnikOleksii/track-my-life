'use client';

import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
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
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { deleteTransaction } from '../../actions/delete-transaction';

interface DeleteTransactionDialogProps {
  transaction: TransactionResponseDto | null;
  onClose: () => void;
  onSuccess: (transactionId: string) => void;
}

export const DeleteTransactionDialog: FC<DeleteTransactionDialogProps> = ({
  transaction,
  onClose,
  onSuccess,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = useCallback(async () => {
    if (!transaction) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteTransaction(transaction.id);
      if (result?.success) {
        onSuccess(transaction.id);
      }
    } finally {
      setIsDeleting(false);
    }
  }, [transaction, onSuccess]);

  return (
    <AlertDialog open={Boolean(transaction)} onOpenChange={(open) => !open && onClose()}>
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
