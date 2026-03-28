'use client';

import type { CurrencyCode } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@track-my-life/ui/src/components/atoms/select/select';
import { cn } from '@track-my-life/ui/src/lib/utils';
import { useTranslations } from 'next-intl';

import { FILTER_TO_LABEL_KEY } from '@/constants/filter';
import { FILTER_OPTION_LIST } from '@/constants/transaction';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { DashboardFilters } from '../../constants/dashboard';

import { CURRENCY_CODE_LIST } from '../../constants/dashboard';
import styles from './DashboardFilterBar.module.scss';

interface DashboardFilterBarProps {
  filters: DashboardFilters;
  onFilterChange: (update: Partial<DashboardFilters>) => void;
}

export const DashboardFilterBar: FC<DashboardFilterBarProps> = ({ filters, onFilterChange }) => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);

  return (
    <div className={styles.bar}>
      <div className={styles.dateRange}>
        <Input
          type="date"
          value={filters.dateFrom}
          onChange={(event) => {
            onFilterChange({ dateFrom: event.target.value });
          }}
          aria-label={translations('content.filterDateFrom')}
        />
        <Input
          type="date"
          value={filters.dateTo}
          onChange={(event) => {
            onFilterChange({ dateTo: event.target.value });
          }}
          aria-label={translations('content.filterDateTo')}
        />
      </div>

      <div
        className={styles.typeFilter}
        role="group"
        aria-label={translations('content.filterType')}
      >
        {FILTER_OPTION_LIST.map((option) => (
          <Button
            key={option}
            variant={filters.type === option ? 'primary' : 'outline'}
            size="sm"
            aria-pressed={filters.type === option}
            onClick={() => {
              onFilterChange({ type: option });
            }}
            className={cn(styles.filterButton, filters.type === option && styles.active)}
          >
            {translations(FILTER_TO_LABEL_KEY[option])}
          </Button>
        ))}
      </div>

      <Select
        value={filters.currencyCode}
        onValueChange={(value: string) => {
          onFilterChange({ currencyCode: value as CurrencyCode });
        }}
      >
        <SelectTrigger
          aria-label={translations('content.filterCurrency')}
          className={styles.currencySelect}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CURRENCY_CODE_LIST.map((code) => (
            <SelectItem key={code} value={code}>
              {code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
