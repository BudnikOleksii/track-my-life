import type {
  CategoryResponseDto,
  CreateTransactionDto,
  CurrencyCode,
  TransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useActionState, useCallback, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import type { ActionState } from '@/constants/action-state';

import { INITIAL_ACTION_STATE } from '@/constants/action-state';
import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE } from '@/constants/transaction';

import type { TransactionFormValues } from '../../../constants/transaction-form-schema';

import { createTransaction } from '../../../actions/create-transaction';
import { updateTransaction } from '../../../actions/update-transaction';
import { transactionFormSchema } from '../../../constants/transaction-form-schema';

const FALLBACK_CURRENCY = 'USD';
const DATE_PART_INDEX = 0;

interface UseTransactionFormPageParams {
  transaction: TransactionResponseDto | null;
  categoryList: CategoryResponseDto[];
  baseCurrencyCode: CurrencyCode | null;
  translations: (key: string) => string;
}

export const useTransactionFormPage = ({
  transaction,
  categoryList,
  baseCurrencyCode,
  translations,
}: UseTransactionFormPageParams) => {
  const router = useRouter();
  const isEditing = Boolean(transaction);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      categoryId: transaction?.categoryId ?? '',
      type: transaction?.type ?? TRANSACTION_TYPE.EXPENSE,
      amount: transaction?.amount ?? '',
      currencyCode: transaction?.currencyCode ?? baseCurrencyCode ?? FALLBACK_CURRENCY,
      date: transaction?.date ? (transaction.date.split('T')[DATE_PART_INDEX] ?? '') : '',
      description: transaction?.description ?? '',
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
      setValue('type', value as TransactionFormValues['type']);
      setValue('categoryId', '');
    },
    [setValue],
  );

  const [isPending, startTransition] = useTransition();
  const [, submitAction] = useActionState(
    async (_prev: ActionState, values: TransactionFormValues): Promise<ActionState> => {
      const { description, ...rest } = values;
      const body: CreateTransactionDto = {
        ...rest,
        currencyCode: values.currencyCode,
        ...(description !== undefined && { description }),
      };

      const result =
        isEditing && transaction
          ? await updateTransaction(transaction.id, body)
          : await createTransaction(body);

      if (result) {
        router.push(PATHS.transactions);
        return { success: true, error: null };
      }
      const errorKey = isEditing ? 'content.updateError' : 'content.createError';
      toast.error(translations(errorKey));
      return { success: false, error: errorKey };
    },
    INITIAL_ACTION_STATE,
  );

  const handleFormSubmit = useCallback(
    (values: TransactionFormValues) => {
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
