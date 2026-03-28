'use client';

import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { DashboardFilters } from '../../hooks/use-dashboard-filters';

import { fetchSummary } from '../../actions/fetch-summary';
import { useWidgetData } from '../../hooks/use-widget-data';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './SummaryWidget.module.scss';

interface SummaryWidgetProps {
  filters: DashboardFilters;
  className?: string;
}

const formatAmount = (amount: string, currencyCode: string): string => `${currencyCode} ${amount}`;

export const SummaryWidget: FC<SummaryWidgetProps> = ({ filters, className }) => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);

  const { data, isLoading } = useWidgetData(
    () =>
      fetchSummary({
        currencyCode: filters.currencyCode,
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
        ...(filters.type !== 'ALL' && { type: filters.type }),
      }),
    `summary-${filters.currencyCode}-${filters.dateFrom}-${filters.dateTo}-${filters.type}`,
  );

  return (
    <WidgetCard
      title={translations('content.summaryTitle')}
      isLoading={isLoading}
      isEmpty={data === null || data.transactionCount === EMPTY_LIST_LENGTH}
      className={className}
    >
      {data && (
        <div className={styles.grid}>
          <div className={styles.statCard}>
            <Typography variant="body-s" className={styles.label}>
              {translations('content.totalIncome')}
            </Typography>
            <Typography variant="title-xs" className={styles.income}>
              {formatAmount(data.totalIncome, data.currencyCode)}
            </Typography>
          </div>
          <div className={styles.statCard}>
            <Typography variant="body-s" className={styles.label}>
              {translations('content.totalExpenses')}
            </Typography>
            <Typography variant="title-xs" className={styles.expense}>
              {formatAmount(data.totalExpenses, data.currencyCode)}
            </Typography>
          </div>
          <div className={styles.statCard}>
            <Typography variant="body-s" className={styles.label}>
              {translations('content.netBalance')}
            </Typography>
            <Typography variant="title-xs" className={styles.balance}>
              {formatAmount(data.netBalance, data.currencyCode)}
            </Typography>
          </div>
          <div className={styles.statCard}>
            <Typography variant="body-s" className={styles.label}>
              {translations('content.transactionCount')}
            </Typography>
            <Typography variant="title-xs">{data.transactionCount}</Typography>
          </div>
        </div>
      )}
    </WidgetCard>
  );
};
