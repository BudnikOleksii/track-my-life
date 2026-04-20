import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useCallback, useState, useTransition } from 'react';

import { pauseRecurringTransaction } from '../actions/pause-recurring-transaction';
import { resumeRecurringTransaction } from '../actions/resume-recurring-transaction';

interface UseRecurringTransactionPendingActionsParams {
  translations: (key: string) => string;
}

export const useRecurringTransactionPendingActions = ({
  translations,
}: UseRecurringTransactionPendingActionsParams) => {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handlePause = useCallback(
    (id: string) => {
      setPendingId(id);
      startTransition(async () => {
        const result = await pauseRecurringTransaction(id);
        if (!result.ok) {
          toast.error(translations('content.pauseError'));
        }
        setPendingId((currentPendingId) => (currentPendingId === id ? null : currentPendingId));
      });
    },
    [translations],
  );

  const handleResume = useCallback(
    (id: string) => {
      setPendingId(id);
      startTransition(async () => {
        const result = await resumeRecurringTransaction(id);
        if (!result.ok) {
          toast.error(translations('content.resumeError'));
        }
        setPendingId((currentPendingId) => (currentPendingId === id ? null : currentPendingId));
      });
    },
    [translations],
  );

  return { pendingId, handlePause, handleResume };
};
