import type {
  CategoryResponseDto,
  CreateRecurringTransactionDto,
  CurrencyCode,
  RecurringFrequency,
  RecurringTransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE } from '@/constants/transaction';

import type { RecurringTransactionFormValues } from '../../../constants/recurring-transaction-form-schema';

import { createRecurringTransaction } from '../../../actions/create-recurring-transaction';
import { updateRecurringTransaction } from '../../../actions/update-recurring-transaction';
import { recurringTransactionFormSchema } from '../../../constants/recurring-transaction-form-schema';

const FALLBACK_CURRENCY = 'USD';
const DEFAULT_INTERVAL = 1;
const DEFAULT_FREQUENCY = 'MONTHLY';
const DATE_PART_INDEX = 0;

interface UseRecurringTransactionFormPageParams {
  recurringTransaction: RecurringTransactionResponseDto | null;
  categoryList: CategoryResponseDto[];
  baseCurrencyCode: CurrencyCode | null;
  translations: (key: string) => string;
}

export const useRecurringTransactionFormPage = ({
  recurringTransaction,
  categoryList,
  baseCurrencyCode,
  translations,
}: UseRecurringTransactionFormPageParams) => {
  const router = useRouter();
  const isEditing = Boolean(recurringTransaction);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RecurringTransactionFormValues>({
    resolver: zodResolver(recurringTransactionFormSchema),
    defaultValues: {
      categoryId: recurringTransaction?.categoryId ?? '',
      type: recurringTransaction?.type ?? TRANSACTION_TYPE.EXPENSE,
      amount: recurringTransaction?.amount ?? '',
      currencyCode: recurringTransaction?.currencyCode ?? baseCurrencyCode ?? FALLBACK_CURRENCY,
      frequency: recurringTransaction?.frequency ?? DEFAULT_FREQUENCY,
      interval: recurringTransaction?.interval ?? DEFAULT_INTERVAL,
      startDate: recurringTransaction?.startDate
        ? recurringTransaction.startDate.split('T')[DATE_PART_INDEX]
        : '',
      endDate: recurringTransaction?.endDate
        ? recurringTransaction.endDate.split('T')[DATE_PART_INDEX]
        : '',
      description: recurringTransaction?.description ?? '',
    },
  });

  const selectedType = watch('type');

  const categoryOptionList = useMemo(
    () =>
      categoryList
        .filter((item) => item.type === selectedType)
        .map((item) => ({ value: item.id, label: item.name })),
    [categoryList, selectedType],
  );

  const handleTypeChange = useCallback(
    (value: string) => {
      setValue('type', value as RecurringTransactionFormValues['type']);
      setValue('categoryId', '');
    },
    [setValue],
  );

  const handleFormSubmit = useCallback(
    async (values: RecurringTransactionFormValues) => {
      const body: CreateRecurringTransactionDto = {
        ...values,
        currencyCode: values.currencyCode as CurrencyCode,
        frequency: values.frequency as RecurringFrequency,
        description: values.description || undefined,
        endDate: values.endDate || undefined,
      };

      const errorKey = isEditing ? 'content.updateError' : 'content.createError';

      try {
        const result =
          isEditing && recurringTransaction
            ? await updateRecurringTransaction(recurringTransaction.id, body)
            : await createRecurringTransaction(body);

        if (result) {
          router.push(PATHS.recurringTransactions);
        } else {
          toast.error(translations(errorKey));
        }
      } catch {
        toast.error(translations(errorKey));
      }
    },
    [isEditing, recurringTransaction, router, translations],
  );

  return {
    isEditing,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    categoryOptionList,
    handleTypeChange,
    handleFormSubmit,
  };
};
