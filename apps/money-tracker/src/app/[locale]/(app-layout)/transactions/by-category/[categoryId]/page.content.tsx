'use client';

import type { TransactionGroupDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Link } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { formatAmount } from '@track-my-life/shared/src/utils/format-amount';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE_BADGE_VARIANT_MAP } from '@/constants/transaction';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './page.module.scss';

interface CategoryDetailContentProps {
  groupList: TransactionGroupDto[];
}

const MONTH_INDEX_OFFSET = 1;
const DATE_PART_INDEX = 0;
const MONTH_PART_INDEX = 1;
const DAY_PART_INDEX = 2;
const DEFAULT_DATE_PART = 0;

const getDateOnly = (dateString: string): string =>
  dateString.split('T')[DATE_PART_INDEX] ?? dateString;

const formatDate = (dateString: string): string => {
  const partList = getDateOnly(dateString).split('-').map(Number);
  const year = partList[DATE_PART_INDEX] ?? DEFAULT_DATE_PART;
  const month = partList[MONTH_PART_INDEX] ?? DEFAULT_DATE_PART;
  const day = partList[DAY_PART_INDEX] ?? DEFAULT_DATE_PART;
  const date = new Date(year, month - MONTH_INDEX_OFFSET, day);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

export const CategoryDetailContent: FC<CategoryDetailContentProps> = ({ groupList }) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsByCategoryPage);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href={PATHS.transactionsByCategory} className={styles.backLink}>
          <ArrowLeft size={18} />
          <Typography variant="body-m" fontWeight="medium" tag="span">
            {translations('content.backToCategories')}
          </Typography>
        </Link>
      </div>

      {groupList.length === EMPTY_LIST_LENGTH ? (
        <div className={styles.empty}>
          <FolderOpen size={48} className={styles.emptyIcon} />
          <Typography variant="body-m" className={styles.emptyText}>
            {translations('content.noTransactions')}
          </Typography>
        </div>
      ) : (
        <div className={styles.groupList}>
          {groupList.map((group, groupIndex) => (
            <div
              key={group.subcategory?.id ?? `direct-${String(groupIndex)}`}
              className={styles.group}
            >
              <div className={styles.groupHeader}>
                <Typography variant="body-m" fontWeight="semibold">
                  {group.subcategory?.name ?? translations('content.directTransactions')}
                </Typography>
                <div className={styles.totalList}>
                  {group.totals.map((total) => (
                    <Typography
                      key={total.currencyCode}
                      variant="body-s"
                      fontWeight="semibold"
                      className={styles.total}
                    >
                      {formatAmount(total.total, total.currencyCode)}
                    </Typography>
                  ))}
                </div>
              </div>
              <div className={styles.transactionList}>
                {group.transactions.map((transaction) => (
                  <div key={transaction.id} className={styles.transactionRow}>
                    <div className={styles.transactionInfo}>
                      <div className={styles.transactionPrimary}>
                        <Typography variant="body-m" className={styles.amount}>
                          {formatAmount(transaction.amount, transaction.currencyCode)}
                        </Typography>
                        <Badge variant={TRANSACTION_TYPE_BADGE_VARIANT_MAP[transaction.type]}>
                          {translations(
                            `content.${transaction.type === 'INCOME' ? 'incomeType' : 'expenseType'}`,
                          )}
                        </Badge>
                      </div>
                      <div className={styles.transactionSecondary}>
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
