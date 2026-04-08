'use client';

import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { NavigationLink } from '@track-my-life/next-shared/src/i18n/navigation/NavigationLink';
import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { formatDate } from '@track-my-life/shared/src/utils/date/format';
import { formatAmount } from '@track-my-life/shared/src/utils/format-amount';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { useLocale, useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE_BADGE_VARIANT_MAP } from '@/constants/transaction';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { WidgetCard } from '../widget-card/WidgetCard';
import styles from './RecentTransactionList.module.scss';

interface RecentTransactionListProps {
  transactionList: TransactionResponseDto[];
}

export const RecentTransactionList: FC<RecentTransactionListProps> = ({ transactionList }) => {
  const translations = useTranslations(I18N_NAMESPACE.dashboardPage);
  const locale = useLocale();

  return (
    <WidgetCard
      title={translations('content.recentTransactionsTitle')}
      isLoading={false}
      isEmpty={transactionList.length === EMPTY_LIST_LENGTH}
    >
      <div className={styles.list}>
        {transactionList.map((transaction) => (
          <div key={transaction.id} className={styles.row}>
            <div className={styles.info}>
              <Typography variant="body-m" className={styles.amount}>
                {formatAmount(transaction.amount, transaction.currencyCode)}
              </Typography>
              <Badge variant={TRANSACTION_TYPE_BADGE_VARIANT_MAP[transaction.type]}>
                {transaction.type}
              </Badge>
            </div>
            <div className={styles.meta}>
              <Typography variant="body-s" className={styles.date}>
                {formatDate(transaction.date, locale)}
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
