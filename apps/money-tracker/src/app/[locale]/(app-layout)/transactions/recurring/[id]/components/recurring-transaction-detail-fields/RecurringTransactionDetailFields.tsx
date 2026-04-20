import type { RecurringTransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { formatDate, formatDateTime } from '@track-my-life/shared/src/utils/date/format';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { FREQUENCY_LABEL_KEY } from '../../../constants/recurring-transaction-display';
import styles from './RecurringTransactionDetailFields.module.scss';

interface RecurringTransactionDetailFieldsProps {
  recurringTransaction: RecurringTransactionResponseDto;
  locale: string;
}

export const RecurringTransactionDetailFields = async ({
  recurringTransaction,
  locale,
}: RecurringTransactionDetailFieldsProps) => {
  const translations = await getTranslations(I18N_NAMESPACE.recurringTransactionsPage);

  return (
    <div className={styles.details}>
      <div className={styles.detailRow}>
        <Typography variant="body-s" className={styles.detailLabel}>
          {translations('content.typeLabel')}
        </Typography>
        <Typography variant="body-m">
          {translations(
            `content.${recurringTransaction.type === 'INCOME' ? 'incomeType' : 'expenseType'}`,
          )}
        </Typography>
      </div>

      <div className={styles.detailRow}>
        <Typography variant="body-s" className={styles.detailLabel}>
          {translations('content.frequencyLabel')}
        </Typography>
        <Typography variant="body-m">
          {translations('content.every', {
            interval: recurringTransaction.interval,
            frequency: translations(
              FREQUENCY_LABEL_KEY[recurringTransaction.frequency],
            ).toLowerCase(),
          })}
        </Typography>
      </div>

      <div className={styles.detailRow}>
        <Typography variant="body-s" className={styles.detailLabel}>
          {translations('content.startDateLabel')}
        </Typography>
        <Typography variant="body-m">
          {formatDate(recurringTransaction.startDate, locale)}
        </Typography>
      </div>

      <div className={styles.detailRow}>
        <Typography variant="body-s" className={styles.detailLabel}>
          {translations('content.endDateLabel')}
        </Typography>
        <Typography variant="body-m">
          {recurringTransaction.endDate
            ? formatDate(recurringTransaction.endDate, locale)
            : translations('content.noEndDate')}
        </Typography>
      </div>

      <div className={styles.detailRow}>
        <Typography variant="body-s" className={styles.detailLabel}>
          {translations('content.nextOccurrenceLabel')}
        </Typography>
        <Typography variant="body-m">
          {formatDate(recurringTransaction.nextOccurrenceDate, locale)}
        </Typography>
      </div>

      <div className={styles.detailRow}>
        <Typography variant="body-s" className={styles.detailLabel}>
          {translations('content.descriptionLabel')}
        </Typography>
        <Typography variant="body-m">
          {recurringTransaction.description || translations('content.noDescription')}
        </Typography>
      </div>

      <div className={styles.detailRow}>
        <Typography variant="body-s" className={styles.detailLabel}>
          {translations('content.createdAtLabel')}
        </Typography>
        <Typography variant="body-m">
          {formatDateTime(recurringTransaction.createdAt, locale)}
        </Typography>
      </div>

      <div className={styles.detailRow}>
        <Typography variant="body-s" className={styles.detailLabel}>
          {translations('content.updatedAtLabel')}
        </Typography>
        <Typography variant="body-m">
          {formatDateTime(recurringTransaction.updatedAt, locale)}
        </Typography>
      </div>
    </div>
  );
};
