import type {
  CategoryResponseDto,
  CurrencyCode,
  TransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { fetchCategoryList } from '@/actions/fetch-category-list';
import { TRANSACTION_TYPE } from '@/constants/transaction';

import type { TransactionFormValues } from '../../../constants/transaction-form-schema';

import { createTransaction } from '../../../actions/create-transaction';
import { updateTransaction } from '../../../actions/update-transaction';
import { transactionFormSchema } from '../../../constants/transaction-form-schema';

const DEFAULT_CURRENCY = 'USD';
const DATE_PART_INDEX = 0;

interface UseTransactionFormParams {
  isOpen: boolean;
  transaction: TransactionResponseDto | null;
  onSuccess: (transaction: TransactionResponseDto) => void;
}

export const useTransactionForm = ({
  isOpen,
  transaction,
  onSuccess,
}: UseTransactionFormParams) => {
  const isEditing = Boolean(transaction);
  const [categoryList, setCategoryList] = useState<CategoryResponseDto[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      categoryId: '',
      type: TRANSACTION_TYPE.EXPENSE,
      amount: '',
      currencyCode: DEFAULT_CURRENCY,
      date: '',
      description: '',
    },
  });

  const selectedType = watch('type');

  useEffect(() => {
    if (isOpen) {
      fetchCategoryList().then(setCategoryList);
      reset({
        categoryId: transaction?.categoryId ?? '',
        type: transaction?.type ?? TRANSACTION_TYPE.EXPENSE,
        amount: transaction?.amount ?? '',
        currencyCode: transaction?.currencyCode ?? DEFAULT_CURRENCY,
        date: transaction?.date ? transaction.date.split('T')[DATE_PART_INDEX] : '',
        description: transaction?.description ?? '',
      });
    }
  }, [isOpen, transaction, reset]);

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
      const body = {
        ...values,
        currencyCode: values.currencyCode as CurrencyCode,
        description: values.description || undefined,
      };

      if (isEditing && transaction) {
        const result = await updateTransaction(transaction.id, body);
        if (result) {
          onSuccess({ ...transaction, ...result });
        }
      } else {
        const result = await createTransaction(body);
        if (result) {
          onSuccess(result as TransactionResponseDto);
        }
      }
    },
    [isEditing, transaction, onSuccess],
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
