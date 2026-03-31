'use client';

import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Link } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Receipt, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { getTransactionsEditPath } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './TransactionList.module.scss';

interface TransactionListProps {
  transactionList: TransactionResponseDto[];
  onDelete: (transaction: TransactionResponseDto) => void;
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

export const TransactionList: FC<TransactionListProps> = ({ transactionList, onDelete }) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);

  if (transactionList.length === EMPTY_LIST_LENGTH) {
    return (
      <div className={styles.empty}>
        <Receipt size={48} className={styles.emptyIcon} />
        <Typography variant="body-m" className={styles.emptyText}>
          {translations('content.noTransactions')}
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {transactionList.map((transaction) => (
        <div key={transaction.id} className={styles.row}>
          <div className={styles.info}>
            <div className={styles.primary}>
              <Typography variant="body-m" className={styles.amount}>
                {formatAmount(transaction.amount, transaction.currencyCode)}
              </Typography>
              <Badge variant={BADGE_VARIANT_MAP[transaction.type]}>
                {translations(
                  `content.${transaction.type === 'INCOME' ? 'incomeType' : 'expenseType'}`,
                )}
              </Badge>
            </div>
            <div className={styles.secondary}>
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
          <div className={styles.actions}>
            <Button
              component={Link}
              href={getTransactionsEditPath(transaction.id)}
              variant="ghost"
              size="sm"
              aria-label={translations('content.editButton')}
            >
              <Pencil size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onDelete(transaction);
              }}
              aria-label={translations('content.deleteButton')}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
