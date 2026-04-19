'use client';

import type { FC } from 'react';

import { Checkbox } from '@track-my-life/ui/src/components/atoms/checkbox/checkbox';

import { useSelectionContext } from './BulkDeleteSelection';

interface TransactionRowCheckboxProps {
  transactionId: string;
  label: string;
  className?: string | undefined;
}

export const TransactionRowCheckbox: FC<TransactionRowCheckboxProps> = ({
  transactionId,
  label,
  className,
}) => {
  const { selectedIdSet, onToggleSelection, isBulkDeleteSubmitting } = useSelectionContext();

  return (
    <Checkbox
      className={className}
      checked={selectedIdSet.has(transactionId)}
      disabled={isBulkDeleteSubmitting}
      aria-label={label}
      onCheckedChange={() => {
        onToggleSelection(transactionId);
      }}
    />
  );
};
