'use client';

import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Link } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { formatDate } from '@track-my-life/shared/src/utils/date/format';
import { formatLocalDate } from '@track-my-life/shared/src/utils/date/parse';
import { formatAmount } from '@track-my-life/shared/src/utils/format-amount';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Checkbox } from '@track-my-life/ui/src/components/atoms/checkbox/checkbox';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { cn } from '@track-my-life/ui/src/lib/utils';
import { Copy, Receipt, Pencil, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { getTransactionsCopyPath, getTransactionsEditPath } from '@/constants/paths';
import { TRANSACTION_TYPE_BADGE_VARIANT_MAP } from '@/constants/transaction';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';
import { formatCategoryDisplayName } from '@/utils/format-category-display-name';

import styles from './TransactionList.module.scss';

interface TransactionListProps {
  transactionList: TransactionResponseDto[];
  onDelete: (transaction: TransactionResponseDto) => void;
  selectedIdSet: ReadonlySet<string>;
  onToggleSelection: (id: string) => void;
  isBulkDeleteSubmitting: boolean;
}

const getDateKey = (dateString: string): string => formatLocalDate(dateString);

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

export const TransactionList: FC<TransactionListProps> = ({
  transactionList,
  onDelete,
  selectedIdSet,
  onToggleSelection,
  isBulkDeleteSubmitting,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);
  const locale = useLocale();

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
              {formatDate(group.dateKey, locale)}
            </Typography>
          </div>
          {group.transactionList.map((transaction) => {
            const isSelected = selectedIdSet.has(transaction.id);
            const selectLabel = translations('content.bulkDelete.selectRowLabel', {
              description: transaction.description ?? '',
              amount: formatAmount(transaction.amount, transaction.currencyCode),
            });

            return (
              <div
                key={transaction.id}
                className={cn(styles.row, isSelected && styles.rowSelected)}
              >
                <div className={styles.rowStart}>
                  <Checkbox
                    className={styles.checkbox}
                    checked={isSelected}
                    disabled={isBulkDeleteSubmitting}
                    aria-label={selectLabel}
                    onCheckedChange={() => {
                      onToggleSelection(transaction.id);
                    }}
                  />
                  <div className={styles.info}>
                    <div className={styles.primary}>
                      <Typography variant="body-m" className={styles.amount}>
                        {formatAmount(transaction.amount, transaction.currencyCode)}
                      </Typography>
                      <Badge variant={TRANSACTION_TYPE_BADGE_VARIANT_MAP[transaction.type]}>
                        {translations(
                          `content.${transaction.type === 'INCOME' ? 'incomeType' : 'expenseType'}`,
                        )}
                      </Badge>
                    </div>
                    <div className={styles.secondary}>
                      <Typography variant="body-s" className={styles.category}>
                        {formatCategoryDisplayName(transaction.category)}
                      </Typography>
                      {transaction.description && (
                        <Typography variant="body-s" className={styles.description}>
                          {transaction.description}
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.actions}>
                  <Button
                    component={Link}
                    href={getTransactionsCopyPath(transaction.id)}
                    variant="ghost"
                    size="sm"
                    aria-label={translations('content.copyButton')}
                  >
                    <Copy size={14} />
                  </Button>
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
            );
          })}
        </div>
      ))}
    </div>
  );
};
