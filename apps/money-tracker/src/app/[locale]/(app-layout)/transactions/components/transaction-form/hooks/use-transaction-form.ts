import type {
  CategoryResponseDto,
  CreateTransactionDto,
  CurrencyCode,
  TransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

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
  categoryList: CategoryResponseDto[];
  onSuccess: (transaction: TransactionResponseDto) => void;
  translations: (key: string) => string;
}

export const useTransactionForm = ({
  isOpen,
  transaction,
  categoryList,
  onSuccess,
  translations,
}: UseTransactionFormParams) => {
  const isEditing = Boolean(transaction);

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

  const categoryOptionList = useMemo(
    () =>
      categoryList
        .filter((item) => item.type === selectedType)
        .map((item) => ({ value: item.id, label: item.name })),
    [categoryList, selectedType],
  );

  useEffect(() => {
    if (isOpen) {
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

  const handleTypeChange = useCallback(
    (value: string) => {
      setValue('type', value as TransactionFormValues['type']);
      setValue('categoryId', '');
    },
    [setValue],
  );

  const handleUpdate = useCallback(
    async (body: CreateTransactionDto, current: TransactionResponseDto) => {
      try {
        const result = await updateTransaction(current.id, body);
        if (result) {
          onSuccess({ ...current, ...result });
        } else {
          toast.error(translations('content.updateError'));
        }
      } catch {
        toast.error(translations('content.updateError'));
      }
    },
    [onSuccess, translations],
  );

  const handleCreate = useCallback(
    async (body: CreateTransactionDto) => {
      try {
        const result = await createTransaction(body);
        if (result) {
          onSuccess(result as TransactionResponseDto);
        } else {
          toast.error(translations('content.createError'));
        }
      } catch {
        toast.error(translations('content.createError'));
      }
    },
    [onSuccess, translations],
  );

  const handleFormSubmit = useCallback(
    async (values: TransactionFormValues) => {
      const body = {
        ...values,
        currencyCode: values.currencyCode as CurrencyCode,
        description: values.description || undefined,
      };

      if (isEditing && transaction) {
        await handleUpdate(body, transaction);
      } else {
        await handleCreate(body);
      }
    },
    [isEditing, transaction, handleUpdate, handleCreate],
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
