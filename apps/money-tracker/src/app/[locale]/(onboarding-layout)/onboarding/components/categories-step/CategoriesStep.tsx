'use client';

import type { FC } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { Badge } from '@track-my-life/ui/src/components/atoms/badge/badge';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './CategoriesStep.module.scss';
import { useCategoriesStep } from './hooks/use-categories-step';

const ROW_NUMBER_OFFSET = 1;

interface CategoriesStepProps {
  currency: string;
  hasPassword: boolean;
}

export const CategoriesStep: FC<CategoriesStepProps> = ({ currency, hasPassword }) => {
  const translations = useTranslations(I18N_NAMESPACE.onboardingPage);

  const {
    isPending,
    fileInputRef,
    defaultsAssigned,
    validationResult,
    fileError,
    importResult,
    hasCategoriesReady,
    handleAssignDefaults,
    handleFileChange,
    handleImport,
    handleContinue,
  } = useCategoriesStep({ currency, hasPassword, translations });

  return (
    <div className={styles.container}>
      <Button
        onClick={handleAssignDefaults}
        disabled={isPending || defaultsAssigned}
        variant={defaultsAssigned ? 'outline' : 'primary'}
      >
        {defaultsAssigned
          ? translations('content.defaultCategoriesAssigned')
          : translations('content.useDefaultCategoriesButton')}
      </Button>

      <div className={styles.divider}>
        <span>{translations('content.orDivider')}</span>
      </div>

      <div className={styles.importSection}>
        <label className={styles.importLabel}>{translations('content.importFileLabel')}</label>
        <Input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json"
          onChange={handleFileChange}
          disabled={isPending}
        />
      </div>

      {fileError && (
        <Typography variant="body-s" className={styles.errorText}>
          {fileError}
        </Typography>
      )}

      {validationResult && !importResult && (
        <div className={styles.previewSection}>
          <div className={styles.previewSummary}>
            <Typography variant="body-s">
              {translations('content.previewTotal', { total: validationResult.rowList.length })}
            </Typography>
            <Typography variant="body-s" className={styles.validText}>
              {translations('content.previewValid', { count: validationResult.validCount })}
            </Typography>
            {validationResult.invalidCount > EMPTY_LIST_LENGTH && (
              <Typography variant="body-s" className={styles.invalidText}>
                {translations('content.previewInvalid', { count: validationResult.invalidCount })}
              </Typography>
            )}
          </div>

          <div className={styles.previewList}>
            {validationResult.rowList.map((row) => (
              <div key={row.index} className={styles.previewRow}>
                <span className={styles.previewRowNumber}>{row.index + ROW_NUMBER_OFFSET}</span>
                <span className={styles.previewRowContent}>
                  {String(row.raw.Date ?? '')} &middot; {String(row.raw.Category ?? '')} &middot;{' '}
                  {String(row.raw.Amount ?? '')} {String(row.raw.Currency ?? '')}
                </span>
                <Badge variant={row.valid ? 'success' : 'destructive'}>
                  {row.valid
                    ? translations('content.previewStatusValid')
                    : translations('content.previewStatusInvalid')}
                </Badge>
              </div>
            ))}
          </div>

          <Button
            onClick={handleImport}
            disabled={validationResult.validCount === EMPTY_LIST_LENGTH || isPending}
          >
            {translations('content.importButton', { count: validationResult.validCount })}
          </Button>
        </div>
      )}

      {importResult && (
        <div className={styles.importResultSection}>
          <Typography variant="body-s">
            {translations('content.importResultTransactions', {
              count: importResult.transactionsCreated,
            })}
          </Typography>
          <Typography variant="body-s">
            {translations('content.importResultCategories', {
              count: importResult.categoriesCreated,
            })}
          </Typography>
          {importResult.subcategoriesCreated > EMPTY_LIST_LENGTH && (
            <Typography variant="body-s">
              {translations('content.importResultSubcategories', {
                count: importResult.subcategoriesCreated,
              })}
            </Typography>
          )}
          {importResult.failedCount > EMPTY_LIST_LENGTH && (
            <Typography variant="body-s" className={styles.invalidText}>
              {translations('content.importResultFailed', { count: importResult.failedCount })}
            </Typography>
          )}
        </div>
      )}

      {hasCategoriesReady && (
        <Button onClick={handleContinue} disabled={isPending}>
          {translations('content.continueButton')}
        </Button>
      )}
    </div>
  );
};
