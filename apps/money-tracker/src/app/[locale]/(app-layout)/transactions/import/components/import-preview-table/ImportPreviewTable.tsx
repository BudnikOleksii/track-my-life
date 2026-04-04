'use client';

import type { FC } from 'react';

import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { cn } from '@track-my-life/ui/src/lib/utils';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { ImportRowResult } from '../../constants/validate-import-row-list';

import styles from './ImportPreviewTable.module.scss';

const ROW_NUMBER_OFFSET = 1;

interface ImportPreviewTableProps {
  rowList: ImportRowResult[];
}

export const ImportPreviewTable: FC<ImportPreviewTableProps> = ({ rowList }) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsImportPage);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{translations('content.columnRow')}</th>
            <th>{translations('content.columnDate')}</th>
            <th>{translations('content.columnCategory')}</th>
            <th>{translations('content.columnType')}</th>
            <th>{translations('content.columnAmount')}</th>
            <th>{translations('content.columnCurrency')}</th>
            <th>{translations('content.columnSubcategory')}</th>
            <th>{translations('content.columnStatus')}</th>
          </tr>
        </thead>
        <tbody>
          {rowList.map((row) => (
            <tr key={row.index} className={cn(!row.valid && styles.invalidRow)}>
              <td>{row.index + ROW_NUMBER_OFFSET}</td>
              <td>{String(row.raw.Date ?? '')}</td>
              <td>{String(row.raw.Category ?? '')}</td>
              <td>{String(row.raw.Type ?? '')}</td>
              <td>{String(row.raw.Amount ?? '')}</td>
              <td>{String(row.raw.Currency ?? '')}</td>
              <td>{String(row.raw.Subcategory ?? '')}</td>
              <td>
                {row.valid ? (
                  <Badge variant="success">{translations('content.statusValid')}</Badge>
                ) : (
                  <div className={styles.errorCell}>
                    <Badge variant="destructive">{translations('content.statusInvalid')}</Badge>
                    <div className={styles.errorList}>
                      {row.errorList.map((issue) => (
                        <Typography
                          key={issue.path.join('.')}
                          variant="body-s"
                          className={styles.errorText}
                        >
                          {translations(`content.${issue.message}`)}
                        </Typography>
                      ))}
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
