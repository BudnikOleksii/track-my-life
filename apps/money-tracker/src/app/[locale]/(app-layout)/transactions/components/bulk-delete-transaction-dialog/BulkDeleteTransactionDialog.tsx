'use client';

import type { Dispatch, FC, SetStateAction } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
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
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { BulkDeleteResult } from '../../actions/types';

import { bulkDeleteTransaction } from '../../actions/bulk-delete-transaction';
import styles from './BulkDeleteTransactionDialog.module.scss';

interface BulkDeleteTransactionDialogProps {
  idList: string[] | null;
  onClose: () => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
  setSelectedIdSet: Dispatch<SetStateAction<Set<string>>>;
}

export const BulkDeleteTransactionDialog: FC<BulkDeleteTransactionDialogProps> = ({
  idList,
  onClose,
  onSubmittingChange,
  setSelectedIdSet,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);
  const [lastResult, setLastResult] = useState<BulkDeleteResult | null>(null);

  const handleSuccess = useCallback(
    (deletedCount: number) => {
      toast.success(translations('content.bulkDelete.successToast', { count: deletedCount }));
      setSelectedIdSet(new Set());
      onClose();
    },
    [onClose, setSelectedIdSet, translations],
  );

  const handlePartialFailure = useCallback(
    ({ deletedCount, failureList }: BulkDeleteResult) => {
      toast.warning(
        translations('content.bulkDelete.partialFailureToast', {
          deleted: deletedCount,
          failed: failureList.length,
        }),
      );
      setSelectedIdSet(new Set(failureList.map((failure) => failure.id)));
    },
    [setSelectedIdSet, translations],
  );

  const handleResult = useCallback(
    (result: BulkDeleteResult) => {
      setLastResult(result);
      if (result.failureList.length === EMPTY_LIST_LENGTH) {
        handleSuccess(result.deletedCount);
        return;
      }
      if (result.deletedCount === EMPTY_LIST_LENGTH) {
        toast.error(translations('content.bulkDelete.totalFailureToast'));
        return;
      }
      handlePartialFailure(result);
    },
    [handlePartialFailure, handleSuccess, translations],
  );

  const handleConfirm = useCallback(async () => {
    if (!idList || idList.length === EMPTY_LIST_LENGTH) {
      return;
    }
    onSubmittingChange(true);
    try {
      const result = await bulkDeleteTransaction([...idList]);
      if (!result.ok) {
        toast.error(translations(`content.bulkDelete.errors.${result.error}`));
        return;
      }
      handleResult(result.data);
    } finally {
      onSubmittingChange(false);
    }
  }, [handleResult, idList, onSubmittingChange, translations]);

  const handleClose = useCallback(() => {
    setLastResult(null);
    onClose();
  }, [onClose]);

  const isOpen = idList !== null && idList.length > EMPTY_LIST_LENGTH;
  const hasFailures = lastResult !== null && lastResult.failureList.length > EMPTY_LIST_LENGTH;

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{translations('content.bulkDelete.confirmTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {translations('content.bulkDelete.confirmBody', {
              count: idList?.length ?? EMPTY_LIST_LENGTH,
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {hasFailures && lastResult && (
          <div className={styles.failureList}>
            <Typography variant="body-s" fontWeight="semibold">
              {translations('content.bulkDelete.failureListTitle')}
            </Typography>
            {lastResult.failureList.map((failure) => (
              <div key={failure.id} className={styles.failureRow}>
                <span>{failure.id}</span>
                <span className={styles.failureReason}>{failure.reason}</span>
              </div>
            ))}
          </div>
        )}
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
            <Button variant="destructive">
              {translations('content.bulkDelete.deleteSelected')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
