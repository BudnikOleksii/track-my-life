import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';

import styles from './BulkDeleteActionBar.module.scss';

interface BulkDeleteActionBarProps {
  selectedCount: number;
  selectedCountLabel: string;
  deleteLabel: string;
  clearLabel: string;
  selectAllLabel: string;
  onDelete: () => void;
  onClear: () => void;
  onSelectAllVisible: () => void;
  isSubmitting: boolean;
  areAllVisibleSelected: boolean;
}

export const BulkDeleteActionBar: FC<BulkDeleteActionBarProps> = ({
  selectedCount,
  selectedCountLabel,
  deleteLabel,
  clearLabel,
  selectAllLabel,
  onDelete,
  onClear,
  onSelectAllVisible,
  isSubmitting,
  areAllVisibleSelected,
}) => (
  <div
    className={styles.bar}
    role="region"
    aria-label={selectedCountLabel}
    data-selected-count={selectedCount}
  >
    <Typography variant="body-m" fontWeight="semibold" className={styles.label}>
      {selectedCountLabel}
    </Typography>
    <div className={styles.actions}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onSelectAllVisible}
        disabled={isSubmitting}
        aria-pressed={areAllVisibleSelected}
      >
        {selectAllLabel}
      </Button>
      <Button variant="outline" size="sm" onClick={onClear} disabled={isSubmitting}>
        {clearLabel}
      </Button>
      <Button variant="destructive" size="sm" onClick={onDelete} disabled={isSubmitting}>
        {isSubmitting && <span className={styles.spinner} aria-hidden />}
        {deleteLabel}
      </Button>
    </div>
  </div>
);
