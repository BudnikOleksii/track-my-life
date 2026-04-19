import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { formatDate } from '@track-my-life/shared/src/utils/date/format';
import { formatAmount } from '@track-my-life/shared/src/utils/format-amount';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@track-my-life/ui/src/components/molecules/accordion/accordion';
import { FolderOpen } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import { TRANSACTION_TYPE_BADGE_VARIANT_MAP } from '@/constants/transaction';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { fetchTransactionsByCategory } from '../actions/fetch-transactions-by-category';
import { BulkDeleteSelection } from './BulkDeleteSelection';
import styles from './page.module.scss';
import { TransactionRowCheckbox } from './TransactionRowCheckbox';

interface CategoryDetailContentProps {
  categoryId: string;
}

export const CategoryDetailContent = async ({ categoryId }: CategoryDetailContentProps) => {
  const [translations, transactionsPageTranslations, locale, result] = await Promise.all([
    getTranslations(I18N_NAMESPACE.transactionsByCategoryPage),
    getTranslations(I18N_NAMESPACE.transactionsPage),
    getLocale(),
    fetchTransactionsByCategory(categoryId),
  ]);

  const groupList = result?.groups ?? [];

  if (groupList.length === EMPTY_LIST_LENGTH) {
    return (
      <div className={styles.empty}>
        <FolderOpen size={48} className={styles.emptyIcon} />
        <Typography variant="body-m" className={styles.emptyText}>
          {translations('content.noTransactions')}
        </Typography>
      </div>
    );
  }

  const visibleIdList = groupList.flatMap((group) =>
    group.transactions.map((transaction) => transaction.id),
  );

  return (
    <BulkDeleteSelection visibleIdList={visibleIdList}>
      <Accordion type="multiple" className={styles.groupList}>
        {groupList.map((group, groupIndex) => {
          const groupKey = group.subcategory?.id ?? `direct-${String(groupIndex)}`;

          return (
            <AccordionItem key={groupKey} value={groupKey} className={styles.group}>
              <AccordionTrigger className={styles.groupHeader}>
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
              </AccordionTrigger>
              <AccordionContent>
                <div className={styles.transactionList}>
                  {group.transactions.map((transaction) => {
                    const selectLabel = transactionsPageTranslations(
                      'content.bulkDelete.selectRowLabel',
                      {
                        description: transaction.description ?? '',
                        amount: formatAmount(transaction.amount, transaction.currencyCode),
                      },
                    );

                    return (
                      <div key={transaction.id} className={styles.transactionRow}>
                        <TransactionRowCheckbox
                          transactionId={transaction.id}
                          label={selectLabel}
                          className={styles.checkbox}
                        />
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
                              {formatDate(transaction.date, locale)}
                            </Typography>
                            {transaction.description && (
                              <Typography variant="body-s" className={styles.description}>
                                {transaction.description}
                              </Typography>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </BulkDeleteSelection>
  );
};
