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

const MONTH_INDEX_OFFSET = 1;

const formatDate = (dateString: string): string => {
  const partList = dateString.split('-').map(Number);
  const year = partList[DATE_PART_INDEX] ?? DEFAULT_DATE_PART;
  const month = partList[MONTH_PART_INDEX] ?? DEFAULT_DATE_PART;
  const day = partList[DAY_PART_INDEX] ?? DEFAULT_DATE_PART;
  const date = new Date(year, month - MONTH_INDEX_OFFSET, day);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatAmount = (amount: string, currencyCode: string): string => `${currencyCode} ${amount}`;

const DATE_PART_INDEX = 0;
const MONTH_PART_INDEX = 1;
const DAY_PART_INDEX = 2;
const DEFAULT_DATE_PART = 0;

const getDateKey = (dateString: string): string =>
  dateString.split('T')[DATE_PART_INDEX] ?? dateString;

interface DateGroup {
  dateKey: string;
  transactionList: TransactionResponseDto[];
}

const groupTransactionListByDate = (transactionList: TransactionResponseDto[]): DateGroup[] => {
  const groupList: DateGroup[] = [];
  let currentGroup: DateGroup | null = null;

  for (const transaction of transactionList) {
    const key = getDateKey(transaction.date);

    if (currentGroup && currentGroup.dateKey === key) {
      currentGroup.transactionList.push(transaction);
    } else {
      currentGroup = { dateKey: key, transactionList: [transaction] };
      groupList.push(currentGroup);
    }
  }

  return groupList;
};

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

  const dateGroupList = groupTransactionListByDate(transactionList);

  return (
    <div className={styles.list}>
      {dateGroupList.map((group, groupIndex) => (
        <div key={`${group.dateKey}-${String(groupIndex)}`} className={styles.dateGroup}>
          <div className={styles.dateHeader}>
            <Typography variant="body-s" fontWeight="semibold">
              {formatDate(group.dateKey)}
            </Typography>
          </div>
          {group.transactionList.map((transaction) => (
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
      ))}
    </div>
  );
};
