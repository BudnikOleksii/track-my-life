import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './ImportSummary.module.scss';

interface ImportSummaryProps {
  total: number;
  validCount: number;
  invalidCount: number;
}

export const ImportSummary: FC<ImportSummaryProps> = ({ total, validCount, invalidCount }) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsImportPage);

  return (
    <div className={styles.summary}>
      <Typography variant="body-m">{translations('content.summaryTotal', { total })}</Typography>
      <Typography variant="body-m" className={styles.valid}>
        {translations('content.summaryValid', { valid: validCount })}
      </Typography>
      {invalidCount > EMPTY_LIST_LENGTH && (
        <Typography variant="body-m" className={styles.invalid}>
          {translations('content.summaryInvalid', { invalid: invalidCount })}
        </Typography>
      )}
    </div>
  );
};
