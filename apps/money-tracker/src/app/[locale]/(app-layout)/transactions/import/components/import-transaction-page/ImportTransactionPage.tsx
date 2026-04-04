'use client';

import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Link } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { ArrowLeft } from 'lucide-react';

import { PATHS } from '@/constants/paths';

import { ImportPreviewTable } from '../import-preview-table/ImportPreviewTable';
import { ImportSummary } from '../import-summary/ImportSummary';
import { useImportTransactionPage } from './hooks/use-import-transaction-page';
import styles from './ImportTransactionPage.module.scss';

export const ImportTransactionPage: FC = () => {
  const { translations, fileError, validationResult, isImporting, handleFileChange, handleImport } =
    useImportTransactionPage();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link
          href={PATHS.transactions}
          className={styles.backLink}
          aria-label={translations('content.backToList')}
        >
          <ArrowLeft size={20} />
        </Link>
        <Typography variant="title-l">{translations('content.pageTitle')}</Typography>
      </div>

      <Field>
        <FieldLabel htmlFor="import-file">{translations('content.fileInputLabel')}</FieldLabel>
        <FieldDescription>{translations('content.fileInputDescription')}</FieldDescription>
        <Input id="import-file" type="file" accept=".json,.csv" onChange={handleFileChange} />
        <Typography variant="body-s" className={styles.hint}>
          {translations('content.fileInputAccept')}
        </Typography>
      </Field>

      {fileError && (
        <Typography variant="body-m" className={styles.error}>
          {fileError}
        </Typography>
      )}

      {validationResult && (
        <>
          <ImportSummary
            total={validationResult.rowList.length}
            validCount={validationResult.validCount}
            invalidCount={validationResult.invalidCount}
          />

          <div className={styles.actions}>
            <Button
              type="button"
              disabled={validationResult.validCount === EMPTY_LIST_LENGTH || isImporting}
              onClick={handleImport}
            >
              {isImporting
                ? translations('content.importing')
                : translations('content.importButton', { count: validationResult.validCount })}
            </Button>
          </div>

          <ImportPreviewTable rowList={validationResult.rowList} />
        </>
      )}
    </div>
  );
};
