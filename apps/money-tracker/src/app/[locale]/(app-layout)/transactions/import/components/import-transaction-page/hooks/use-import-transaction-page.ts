import type { ChangeEvent } from 'react';

import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { ValidationResult } from '../../../constants/validate-import-row-list';

import { importTransactionList } from '../../../actions/import-transaction-list';
import { parseImportFile } from '../../../constants/parse-import-file';
import { validateImportRowList } from '../../../constants/validate-import-row-list';

const FIRST_FILE_INDEX = 0;
const FALLBACK_COUNT = 0;

const getSelectedFile = (event: ChangeEvent<HTMLInputElement>): File | undefined =>
  event.target.files?.[FIRST_FILE_INDEX];

const prepareFormData = (file: File): FormData => {
  const formData = new FormData();
  formData.append('file', file);
  return formData;
};

const submitImport = async (file: File): Promise<number | null> => {
  try {
    const result = await importTransactionList(prepareFormData(file));

    if (!result || result.error) {
      return null;
    }

    return result.data?.transactionsCreated ?? FALLBACK_COUNT;
  } catch {
    return null;
  }
};

export const useImportTransactionPage = () => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsImportPage);
  const router = useRouter();
  const [fileError, setFileError] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const resetState = useCallback(() => {
    setFileError(null);
    setValidationResult(null);
    setSelectedFile(null);
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      resetState();
      const file = getSelectedFile(event);

      if (!file) {
        return;
      }

      const parseResult = await parseImportFile(file);

      if (!parseResult.ok) {
        setFileError(translations(`content.${parseResult.error}`));
        return;
      }

      setSelectedFile(file);
      setValidationResult(validateImportRowList(parseResult.rowList));
    },
    [translations, resetState],
  );

  const handleImport = useCallback(async () => {
    if (!selectedFile || !validationResult || validationResult.validCount === EMPTY_LIST_LENGTH) {
      return;
    }

    setIsImporting(true);
    const importedCount = await submitImport(selectedFile);
    setIsImporting(false);

    if (importedCount === null) {
      toast.error(translations('content.importError'));
      return;
    }

    toast.success(translations('content.importSuccess', { count: importedCount }));
    router.push(PATHS.transactions);
  }, [selectedFile, validationResult, translations, router]);

  return {
    translations,
    fileError,
    validationResult,
    isImporting,
    handleFileChange,
    handleImport,
  };
};
