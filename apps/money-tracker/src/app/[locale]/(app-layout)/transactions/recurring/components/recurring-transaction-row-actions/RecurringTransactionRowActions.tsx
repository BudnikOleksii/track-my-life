'use client';

import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC, ReactNode } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Checkbox } from '@track-my-life/ui/src/components/atoms/checkbox/checkbox';
import { cn } from '@track-my-life/ui/src/lib/utils';
import { Pause, Play, Trash2 } from 'lucide-react';

import {
  useRecurringTransactionRowDispatchContext,
  useRecurringTransactionRowPendingContext,
  useRecurringTransactionRowSelectionContext,
} from './recurring-transaction-row-actions-context';

interface RecurringTransactionRowCheckboxProps {
  recurringTransactionId: string;
  selectLabel: string;
  className?: string | undefined;
}

export const RecurringTransactionRowCheckbox: FC<RecurringTransactionRowCheckboxProps> = ({
  recurringTransactionId,
  selectLabel,
  className,
}) => {
  const { isBulkDeleteSubmitting, onToggleSelection } = useRecurringTransactionRowDispatchContext();
  const { selectedIdSet } = useRecurringTransactionRowSelectionContext();

  return (
    <Checkbox
      className={className}
      checked={selectedIdSet.has(recurringTransactionId)}
      disabled={isBulkDeleteSubmitting}
      aria-label={selectLabel}
      onCheckedChange={() => {
        onToggleSelection(recurringTransactionId);
      }}
    />
  );
};

interface RecurringTransactionRowActionsProps {
  recurringTransaction: RecurringTransactionResponseDto;
  pauseLabel: string;
  resumeLabel: string;
  deleteLabel: string;
}

export const RecurringTransactionRowActions: FC<RecurringTransactionRowActionsProps> = ({
  recurringTransaction,
  pauseLabel,
  resumeLabel,
  deleteLabel,
}) => {
  const { onPause, onResume, onRequestDelete } = useRecurringTransactionRowDispatchContext();
  const { pendingId } = useRecurringTransactionRowPendingContext();
  const isRowPending = pendingId === recurringTransaction.id;

  return (
    <>
      {recurringTransaction.status === 'ACTIVE' && (
        <Button
          variant="ghost"
          size="sm"
          disabled={isRowPending}
          onClick={() => {
            onPause(recurringTransaction.id);
          }}
          aria-label={pauseLabel}
        >
          <Pause size={14} />
        </Button>
      )}
      {recurringTransaction.status === 'PAUSED' && (
        <Button
          variant="ghost"
          size="sm"
          disabled={isRowPending}
          onClick={() => {
            onResume(recurringTransaction.id);
          }}
          aria-label={resumeLabel}
        >
          <Play size={14} />
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          onRequestDelete(recurringTransaction);
        }}
        aria-label={deleteLabel}
      >
        <Trash2 size={14} />
      </Button>
    </>
  );
};

interface RecurringTransactionRowSelectionStyleProps {
  recurringTransactionId: string;
  baseClassName: string | undefined;
  selectedClassName: string | undefined;
  children: ReactNode;
}

export const RecurringTransactionRowSelectionStyle: FC<
  RecurringTransactionRowSelectionStyleProps
> = ({ recurringTransactionId, baseClassName, selectedClassName, children }) => {
  const { selectedIdSet } = useRecurringTransactionRowSelectionContext();
  const isSelected = selectedIdSet.has(recurringTransactionId);

  return <div className={cn(baseClassName, isSelected && selectedClassName)}>{children}</div>;
};
