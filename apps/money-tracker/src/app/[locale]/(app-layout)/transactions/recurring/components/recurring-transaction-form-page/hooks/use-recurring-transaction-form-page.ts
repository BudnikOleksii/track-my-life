import type {
  CategoryResponseDto,
  CreateRecurringTransactionDto,
  CurrencyCode,
  RecurringFrequency,
  RecurringTransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import {
  convertLocalDateToUTCISO,
  formatLocalDate,
  parseLocalDate,
} from '@track-my-life/shared/src/utils/date/parse';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useActionState, useCallback, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import type { ActionState } from '@/constants/action-state';

import { INITIAL_ACTION_STATE } from '@/constants/action-state';
import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE } from '@/constants/transaction';

import type { RecurringTransactionFormValues } from '../../../constants/recurring-transaction-form-schema';

import { createRecurringTransaction } from '../../../actions/create-recurring-transaction';
import { updateRecurringTransaction } from '../../../actions/update-recurring-transaction';
import { recurringTransactionFormSchema } from '../../../constants/recurring-transaction-form-schema';

const FALLBACK_CURRENCY = 'USD';
const DEFAULT_INTERVAL = 1;
const DEFAULT_FREQUENCY = 'MONTHLY';

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
    formState: { errors },
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
        ? formatLocalDate(recurringTransaction.startDate)
        : '',
      endDate: recurringTransaction?.endDate ? formatLocalDate(recurringTransaction.endDate) : '',
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

  const [isPending, startTransition] = useTransition();
  const [, submitAction] = useActionState(
    async (_prev: ActionState, values: RecurringTransactionFormValues): Promise<ActionState> => {
      const { description, endDate, startDate, ...rest } = values;
      const body: CreateRecurringTransactionDto = {
        ...rest,
        startDate: convertLocalDateToUTCISO(parseLocalDate(startDate)),
        currencyCode: values.currencyCode,
        frequency: values.frequency as RecurringFrequency,
        ...(description !== undefined && { description }),
        ...(endDate && {
          endDate: convertLocalDateToUTCISO(parseLocalDate(endDate)),
        }),
      };

      const result =
        isEditing && recurringTransaction
          ? await updateRecurringTransaction(recurringTransaction.id, body)
          : await createRecurringTransaction(body);

      if (result) {
        router.push(PATHS.recurringTransactions);
        return { success: true, error: null };
      }
      const errorKey = isEditing ? 'content.updateError' : 'content.createError';
      toast.error(translations(errorKey));
      return { success: false, error: errorKey };
    },
    INITIAL_ACTION_STATE,
  );

  const handleFormSubmit = useCallback(
    (values: RecurringTransactionFormValues) => {
      startTransition(() => {
        submitAction(values);
      });
    },
    [submitAction, startTransition],
  );

  return {
    isEditing,
    register,
    handleSubmit,
    control,
    errors,
    isPending,
    categoryOptionList,
    handleTypeChange,
    handleFormSubmit,
  };
};
