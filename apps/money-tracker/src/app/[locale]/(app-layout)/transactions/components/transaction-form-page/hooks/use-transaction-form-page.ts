import type {
  CategoryResponseDto,
  CreateTransactionDto,
  CurrencyCode,
  TransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE } from '@/constants/transaction';

import type { TransactionFormValues } from '../../../constants/transaction-form-schema';

import { createTransaction } from '../../../actions/create-transaction';
import { updateTransaction } from '../../../actions/update-transaction';
import { transactionFormSchema } from '../../../constants/transaction-form-schema';

const DEFAULT_CURRENCY = 'USD';
const DATE_PART_INDEX = 0;

interface UseTransactionFormPageParams {
  transaction: TransactionResponseDto | null;
  categoryList: CategoryResponseDto[];
  translations: (key: string) => string;
}

export const useTransactionFormPage = ({
  transaction,
  categoryList,
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
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      categoryId: transaction?.categoryId ?? '',
      type: transaction?.type ?? TRANSACTION_TYPE.EXPENSE,
      amount: transaction?.amount ?? '',
      currencyCode: transaction?.currencyCode ?? DEFAULT_CURRENCY,
      date: transaction?.date ? transaction.date.split('T')[DATE_PART_INDEX] : '',
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

  const handleFormSubmit = useCallback(
    async (values: TransactionFormValues) => {
      const body: CreateTransactionDto = {
        ...values,
        currencyCode: values.currencyCode as CurrencyCode,
        description: values.description || undefined,
      };

      const errorKey = isEditing ? 'content.updateError' : 'content.createError';

      try {
        const result =
          isEditing && transaction
            ? await updateTransaction(transaction.id, body)
            : await createTransaction(body);

        if (result) {
          router.push(PATHS.transactions);
        } else {
          toast.error(translations(errorKey));
        }
      } catch {
        toast.error(translations(errorKey));
      }
    },
    [isEditing, transaction, router, translations],
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
