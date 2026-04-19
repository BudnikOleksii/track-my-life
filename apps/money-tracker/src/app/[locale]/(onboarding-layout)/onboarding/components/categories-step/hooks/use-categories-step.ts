import type { TranslateFn } from '@track-my-life/next-shared/src/types/translate-fn';
import type {
  CurrencyCode,
  ImportTransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';
import type { ChangeEvent } from 'react';

import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useCallback, useRef, useState, useTransition } from 'react';

import { PATHS } from '@/constants/paths';

import type { ValidationResult } from '../../../../../(app-layout)/transactions/import/constants/validate-import-row-list';

import { importTransactionList } from '../../../../../(app-layout)/transactions/import/actions/import-transaction-list';
import { parseImportFile } from '../../../../../(app-layout)/transactions/import/constants/parse-import-file';
import { validateImportRowList } from '../../../../../(app-layout)/transactions/import/constants/validate-import-row-list';
import { assignDefaultCategories } from '../../../actions/assign-default-categories';
import { completeOnboarding } from '../../../actions/complete-onboarding';
import { ONBOARDING_STEP } from '../../../constants/onboarding-step';

const FIRST_FILE_INDEX = 0;

interface UseCategoriesStepParams {
  currency: CurrencyCode;
  hasPassword: boolean;
  translations: TranslateFn;
}

const getSelectedFile = (event: ChangeEvent<HTMLInputElement>): File | undefined =>
  event.target.files?.[FIRST_FILE_INDEX];

const prepareFormData = (file: File): FormData => {
  const formData = new FormData();
  formData.append('file', file);
  return formData;
};

const useCategoriesStepState = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [defaultsAssigned, setDefaultsAssigned] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [importResult, setImportResult] = useState<ImportTransactionResponseDto | null>(null);

  const resetFileState = useCallback(() => {
    setFileError(null);
    setValidationResult(null);
    setSelectedFile(null);
    setImportResult(null);
  }, []);

  return {
    fileInputRef,
    defaultsAssigned,
    setDefaultsAssigned,
    selectedFile,
    setSelectedFile,
    validationResult,
    setValidationResult,
    fileError,
    setFileError,
    importResult,
    setImportResult,
    resetFileState,
  };
};

export const useCategoriesStep = ({
  currency,
  hasPassword,
  translations,
}: UseCategoriesStepParams) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const state = useCategoriesStepState();

  const advanceToNextStep = useCallback(async () => {
    if (hasPassword) {
      const result = await completeOnboarding({ baseCurrencyCode: currency });
      if (result?.error) {
        toast.error(translations('content.completeError'));
      }
      return;
    }
    router.replace(`${PATHS.onboarding}?step=${ONBOARDING_STEP.password}&currency=${currency}`);
  }, [currency, hasPassword, router, translations]);

  const handleAssignDefaults = useCallback(() => {
    startTransition(async () => {
      const result = await assignDefaultCategories();

      if (result.error) {
        toast.error(translations('content.categoriesAssignError'));
        return;
      }

      toast.success(translations('content.categoriesAssignSuccess'));
      state.setDefaultsAssigned(true);
    });
  }, [translations, state]);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      state.resetFileState();
      const file = getSelectedFile(event);
      if (!file) {
        return;
      }

      const parseResult = await parseImportFile(file);

      if (!parseResult.ok) {
        state.setFileError(translations(`content.import_${parseResult.error}`));
        return;
      }

      state.setSelectedFile(file);
      state.setValidationResult(validateImportRowList(parseResult.rowList));
    },
    [translations, state],
  );

  const handleImport = useCallback(() => {
    if (
      !state.selectedFile ||
      !state.validationResult ||
      state.validationResult.validCount === EMPTY_LIST_LENGTH
    ) {
      return;
    }

    startTransition(async () => {
      const result = await importTransactionList(prepareFormData(state.selectedFile as File));

      if (result.error) {
        toast.error(translations('content.categoriesImportError'));
        return;
      }

      if (result.data) {
        state.setImportResult(result.data);
      }
      toast.success(translations('content.categoriesImportSuccess'));
    });
  }, [state, translations]);

  const handleContinue = useCallback(() => {
    startTransition(async () => {
      await advanceToNextStep();
    });
  }, [advanceToNextStep]);

  return {
    isPending,
    fileInputRef: state.fileInputRef,
    defaultsAssigned: state.defaultsAssigned,
    validationResult: state.validationResult,
    fileError: state.fileError,
    importResult: state.importResult,
    hasCategoriesReady: state.defaultsAssigned || state.importResult !== null,
    handleAssignDefaults,
    handleFileChange,
    handleImport,
    handleContinue,
  };
};
