import type {
  CategoryResponseDto,
  CreateTransactionDto,
  CurrencyCode,
  TransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { formatLocalDate } from '@track-my-life/shared/src/utils/date';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useActionState, useCallback, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import type { ActionState } from '@/constants/action-state';

import { INITIAL_ACTION_STATE } from '@/constants/action-state';
import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE } from '@/constants/transaction';

import type { TransactionFormValues } from '../../../constants/transaction-form-schema';

import { createTransaction } from '../../../actions/create-transaction';
import { updateTransaction } from '../../../actions/update-transaction';
import { transactionFormSchema } from '../../../constants/transaction-form-schema';

const PAD_LENGTH = 2;
const MONTH_INDEX_OFFSET = 1;

const formatPadded = (value: number): string => String(value).padStart(PAD_LENGTH, '0');

const getCurrentTime = (): string => {
  const now = new Date();
  return `${formatPadded(now.getHours())}:${formatPadded(now.getMinutes())}`;
};

const extractTimeFromISO = (isoString: string): string => {
  const date = new Date(isoString);
  return `${formatPadded(date.getHours())}:${formatPadded(date.getMinutes())}`;
};

const combineDateAndTime = (dateStr: string, timeStr: string): string => {
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const [hoursStr, minutesStr] = timeStr.split(':');
  const date = new Date(
    Number(yearStr),
    Number(monthStr) - MONTH_INDEX_OFFSET,
    Number(dayStr),
    Number(hoursStr),
    Number(minutesStr),
  );
  return date.toISOString();
};

const getCurrentDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = formatPadded(now.getMonth() + MONTH_INDEX_OFFSET);
  const day = formatPadded(now.getDate());
  return `${year}-${month}-${day}`;
};

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
      date: transaction?.date ? formatLocalDate(transaction.date) : getCurrentDate(),
      time: transaction?.date ? extractTimeFromISO(transaction.date) : getCurrentTime(),
      description: transaction?.description ?? '',
    },
  });

  const selectedType = watch('type');

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
      const { description, date, time, ...rest } = values;
      const body: CreateTransactionDto = {
        ...rest,
        date: combineDateAndTime(date, time),
        currencyCode: baseCurrencyCode ?? 'USD',
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
    selectedType,
    categoryList,
    handleTypeChange,
    handleFormSubmit,
  };
};
