import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useCallback, useOptimistic, useTransition } from 'react';

import { PATHS } from '@/constants/paths';

import { deleteRecurringTransaction } from '../../actions/delete-recurring-transaction';
import { pauseRecurringTransaction } from '../../actions/pause-recurring-transaction';
import { resumeRecurringTransaction } from '../../actions/resume-recurring-transaction';

type OptimisticAction = { type: 'pause' } | { type: 'resume' };

const applyOptimisticUpdate = (
  current: RecurringTransactionResponseDto,
  action: OptimisticAction,
): RecurringTransactionResponseDto => {
  switch (action.type) {
    case 'pause': {
      return { ...current, status: 'PAUSED' };
    }
    case 'resume': {
      return { ...current, status: 'ACTIVE' };
    }
  }
};

interface UseRecurringTransactionActionsParams {
  recurringTransaction: RecurringTransactionResponseDto;
  translations: (key: string) => string;
}

export const useRecurringTransactionActions = ({
  recurringTransaction,
  translations,
}: UseRecurringTransactionActionsParams) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [optimisticTransaction, applyOptimistic] = useOptimistic(
    recurringTransaction,
    applyOptimisticUpdate,
  );

  const handlePause = useCallback(() => {
    startTransition(async () => {
      applyOptimistic({ type: 'pause' });
      const result = await pauseRecurringTransaction(recurringTransaction.id);
      if (!result.ok) {
        toast.error(translations('content.pauseError'));
      }
      router.refresh();
    });
  }, [recurringTransaction.id, router, translations, applyOptimistic]);

  const handleResume = useCallback(() => {
    startTransition(async () => {
      applyOptimistic({ type: 'resume' });
      const result = await resumeRecurringTransaction(recurringTransaction.id);
      if (!result.ok) {
        toast.error(translations('content.resumeError'));
      }
      router.refresh();
    });
  }, [recurringTransaction.id, router, translations, applyOptimistic]);

  const handleDelete = useCallback(() => {
    startTransition(async () => {
      const result = await deleteRecurringTransaction(recurringTransaction.id);
      if (result.ok) {
        router.push(PATHS.recurringTransactions);
      } else {
        toast.error(translations('content.deleteError'));
      }
    });
  }, [recurringTransaction.id, router, translations]);

  return {
    optimisticTransaction,
    isPending,
    handlePause,
    handleResume,
    handleDelete,
  };
};
