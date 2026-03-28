'use client';

import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { NavigationLink } from '@track-my-life/shared/src/i18n/navigation/NavigationLink';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { DashboardFilters } from '../../hooks/use-dashboard-filters';

import { fetchTransactionList } from '../../../transactions/actions/fetch-transaction-list';
import { RECENT_TRANSACTION_LIST_LIMIT } from '../../constants/dashboard';
import { useWidgetData } from '../../hooks/use-widget-data';
import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './RecentTransactionList.module.scss';

interface RecentTransactionListProps {
  filters: DashboardFilters;
}

const BADGE_VARIANT_MAP = {
  INCOME: 'success',
  EXPENSE: 'warning',
} as const;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatAmount = (amount: string, currencyCode: string): string => `${currencyCode} ${amount}`;

export const RecentTransactionList: FC<RecentTransactionListProps> = ({ filters }) => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);

  const { data, isLoading } = useWidgetData(
    () =>
      fetchTransactionList({
        pageSize: RECENT_TRANSACTION_LIST_LIMIT,
        ...(filters.type !== 'ALL' && { type: filters.type }),
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
      }),
    `recent-${filters.type}-${filters.dateFrom}-${filters.dateTo}`,
  );

  const transactionList = data?.data ?? [];

  return (
    <WidgetCard
      title={translations('content.recentTransactionsTitle')}
      isLoading={isLoading}
      isEmpty={transactionList.length === EMPTY_LIST_LENGTH}
    >
      <div className={styles.list}>
        {transactionList.map((transaction) => (
          <div key={transaction.id} className={styles.row}>
            <div className={styles.info}>
              <Typography variant="body-m" className={styles.amount}>
                {formatAmount(transaction.amount, transaction.currencyCode)}
              </Typography>
              <Badge variant={BADGE_VARIANT_MAP[transaction.type]}>{transaction.type}</Badge>
            </div>
            <div className={styles.meta}>
              <Typography variant="body-s" className={styles.date}>
                {formatDate(transaction.date)}
              </Typography>
              {transaction.description && (
                <Typography variant="body-s" className={styles.description}>
                  {transaction.description}
                </Typography>
              )}
            </div>
          </div>
        ))}
        <NavigationLink href={PATHS.transactions} className={styles.viewAll}>
          {translations('content.viewAllTransactions')}
        </NavigationLink>
      </div>
    </WidgetCard>
  );
};
