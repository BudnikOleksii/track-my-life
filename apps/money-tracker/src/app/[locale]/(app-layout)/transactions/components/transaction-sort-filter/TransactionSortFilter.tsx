'use client';

import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@track-my-life/ui/src/components/atoms/select/select';
import { ArrowDownUp, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import {
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  SORT_BY_OPTION_LIST,
  SORT_BY_TO_LABEL_KEY,
} from '../../constants/sort';
import styles from './TransactionSortFilter.module.scss';

interface TransactionSortFilterProps {
  sortBy: string;
  sortOrder: string;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

export const TransactionSortFilter: FC<TransactionSortFilterProps> = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);
  const activeSortBy = sortBy || DEFAULT_SORT_BY;
  const activeSortOrder = sortOrder || DEFAULT_SORT_ORDER;

  const handleSortOrderToggle = () => {
    onSortOrderChange(activeSortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className={styles.filter}>
      <Select value={activeSortBy} onValueChange={onSortByChange}>
        <SelectTrigger className={styles.trigger}>
          <ArrowDownUp size={14} />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_BY_OPTION_LIST.map((option) => (
            <SelectItem key={option} value={option}>
              {translations(SORT_BY_TO_LABEL_KEY[option])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={handleSortOrderToggle}
        aria-label={translations(
          activeSortOrder === 'desc' ? 'content.descending' : 'content.ascending',
        )}
      >
        {activeSortOrder === 'desc' ? <ArrowDownAZ size={16} /> : <ArrowUpAZ size={16} />}
      </Button>
    </div>
  );
};
