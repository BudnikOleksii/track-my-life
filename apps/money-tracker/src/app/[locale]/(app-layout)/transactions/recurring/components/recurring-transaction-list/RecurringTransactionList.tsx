import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Link } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { formatDate } from '@track-my-life/shared/src/utils/date/format';
import { formatAmount } from '@track-my-life/shared/src/utils/format-amount';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Pencil, Repeat } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import {
  getRecurringTransactionsDetailPath,
  getRecurringTransactionsEditPath,
} from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';
import { formatCategoryDisplayName } from '@/utils/format-category-display-name';

import {
  FREQUENCY_LABEL_KEY,
  STATUS_BADGE_VARIANT_MAP,
  STATUS_LABEL_KEY,
} from '../../constants/recurring-transaction-display';
import {
  RecurringTransactionRowActions,
  RecurringTransactionRowCheckbox,
  RecurringTransactionRowSelectionStyle,
} from '../recurring-transaction-row-actions/RecurringTransactionRowActions';
import styles from './RecurringTransactionList.module.scss';

interface RecurringTransactionListProps {
  recurringTransactionList: RecurringTransactionResponseDto[];
  locale: string;
}

export const RecurringTransactionList: FC<RecurringTransactionListProps> = async ({
  recurringTransactionList,
  locale,
}) => {
  const translations = await getTranslations(I18N_NAMESPACE.recurringTransactionsPage);

  if (recurringTransactionList.length === EMPTY_LIST_LENGTH) {
    return (
      <div className={styles.empty}>
        <Repeat size={48} className={styles.emptyIcon} />
        <Typography variant="body-m" className={styles.emptyText}>
          {translations('content.noRecurringTransactions')}
        </Typography>
        <Typography variant="body-s" className={styles.emptyHint}>
          {translations('content.noRecurringTransactionsHint')}
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {recurringTransactionList.map((item) => {
        const selectLabel = translations('content.bulkDelete.selectRowLabel', {
          amount: formatAmount(item.amount, item.currencyCode),
          category: formatCategoryDisplayName(item.category),
        });

        return (
          <RecurringTransactionRowSelectionStyle
            key={item.id}
            recurringTransactionId={item.id}
            baseClassName={styles.row}
            selectedClassName={styles.rowSelected}
          >
            <RecurringTransactionRowCheckbox
              recurringTransactionId={item.id}
              selectLabel={selectLabel}
              className={styles.checkbox}
            />
            <Link href={getRecurringTransactionsDetailPath(item.id)} className={styles.info}>
              <div className={styles.primary}>
                <Typography variant="body-m" className={styles.amount}>
                  {formatAmount(item.amount, item.currencyCode)}
                </Typography>
                <Badge variant={STATUS_BADGE_VARIANT_MAP[item.status]}>
                  {translations(STATUS_LABEL_KEY[item.status])}
                </Badge>
              </div>
              <div className={styles.secondary}>
                <Typography variant="body-s" className={styles.category}>
                  {formatCategoryDisplayName(item.category)}
                </Typography>
                <Typography variant="body-s" className={styles.frequency}>
                  {translations('content.every', {
                    interval: item.interval,
                    frequency: translations(FREQUENCY_LABEL_KEY[item.frequency]).toLowerCase(),
                  })}
                </Typography>
                <Typography variant="body-s" className={styles.nextDate}>
                  {translations('content.nextOccurrence', {
                    date: formatDate(item.nextOccurrenceDate, locale),
                  })}
                </Typography>
              </div>
              {item.description && (
                <Typography variant="body-s" className={styles.description}>
                  {item.description}
                </Typography>
              )}
            </Link>
            <div className={styles.actions}>
              <Button
                component={Link}
                href={getRecurringTransactionsEditPath(item.id)}
                variant="ghost"
                size="sm"
                aria-label={translations('content.editButton')}
              >
                <Pencil size={14} />
              </Button>
              <RecurringTransactionRowActions
                recurringTransaction={item}
                pauseLabel={translations('content.pauseButton')}
                resumeLabel={translations('content.resumeButton')}
                deleteLabel={translations('content.deleteButton')}
              />
            </div>
          </RecurringTransactionRowSelectionStyle>
        );
      })}
    </div>
  );
};
