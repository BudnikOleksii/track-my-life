'use client';

import type { FC } from 'react';

import {
  formatMonthYear,
  getNextMonth,
  getPreviousMonth,
} from '@track-my-life/shared/src/utils/date';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './MonthNavigator.module.scss';

const YEAR_OFFSET = 1;

interface MonthNavigatorProps {
  year: number;
  month: number;
  onMonthChange: (year: number, month: number) => void;
}

export const MonthNavigator: FC<MonthNavigatorProps> = ({ year, month, onMonthChange }) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);
  const locale = useLocale();

  const handlePreviousMonth = () => {
    const prev = getPreviousMonth(year, month);
    onMonthChange(prev.year, prev.month);
  };

  const handleNextMonth = () => {
    const next = getNextMonth(year, month);
    onMonthChange(next.year, next.month);
  };

  const handlePreviousYear = () => {
    onMonthChange(year - YEAR_OFFSET, month);
  };

  const handleNextYear = () => {
    onMonthChange(year + YEAR_OFFSET, month);
  };

  return (
    <div className={styles.navigator}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePreviousMonth}
        aria-label={translations('content.previousMonth')}
      >
        <ChevronLeft size={18} />
      </Button>
      <div className={styles.center}>
        <Typography variant="body-m" fontWeight="semibold" className={styles.label}>
          {formatMonthYear(year, month, locale)}
        </Typography>
        <div className={styles.yearControl}>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePreviousYear}
            aria-label={translations('content.previousYear')}
            className={styles.yearButton}
          >
            <ChevronUp size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextYear}
            aria-label={translations('content.nextYear')}
            className={styles.yearButton}
          >
            <ChevronDown size={14} />
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNextMonth}
        aria-label={translations('content.nextMonth')}
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
};
