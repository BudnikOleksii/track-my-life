'use client';

import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC, ReactNode } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Checkbox } from '@track-my-life/ui/src/components/atoms/checkbox/checkbox';
import { cn } from '@track-my-life/ui/src/lib/utils';
import { Trash2 } from 'lucide-react';

import {
  useTransactionRowDispatchContext,
  useTransactionRowSelectionContext,
} from './transaction-row-actions-context';

interface TransactionRowCheckboxProps {
  transactionId: string;
  selectLabel: string;
  className?: string | undefined;
}

export const TransactionRowCheckbox: FC<TransactionRowCheckboxProps> = ({
  transactionId,
  selectLabel,
  className,
}) => {
  const { isBulkDeleteSubmitting, onToggleSelection } = useTransactionRowDispatchContext();
  const { selectedIdSet } = useTransactionRowSelectionContext();

  return (
    <Checkbox
      className={className}
      checked={selectedIdSet.has(transactionId)}
      disabled={isBulkDeleteSubmitting}
      aria-label={selectLabel}
      onCheckedChange={() => {
        onToggleSelection(transactionId);
      }}
    />
  );
};

interface TransactionRowDeleteButtonProps {
  transaction: TransactionResponseDto;
  deleteLabel: string;
}

export const TransactionRowDeleteButton: FC<TransactionRowDeleteButtonProps> = ({
  transaction,
  deleteLabel,
}) => {
  const { onRequestDelete } = useTransactionRowDispatchContext();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        onRequestDelete(transaction);
      }}
      aria-label={deleteLabel}
    >
      <Trash2 size={14} />
    </Button>
  );
};

interface TransactionRowSelectionStyleProps {
  transactionId: string;
  baseClassName: string | undefined;
  selectedClassName: string | undefined;
  children: ReactNode;
}

export const TransactionRowSelectionStyle: FC<TransactionRowSelectionStyleProps> = ({
  transactionId,
  baseClassName,
  selectedClassName,
  children,
}) => {
  const { selectedIdSet } = useTransactionRowSelectionContext();
  const isSelected = selectedIdSet.has(transactionId);

  return <div className={cn(baseClassName, isSelected && selectedClassName)}>{children}</div>;
};
