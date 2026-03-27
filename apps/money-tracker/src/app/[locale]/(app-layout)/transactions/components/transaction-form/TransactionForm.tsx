'use client';

import type { TransactionResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@track-my-life/ui/src/components/atoms/select/select';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@track-my-life/ui/src/components/molecules/alert-dialog/alert-dialog';
import { Combobox } from '@track-my-life/ui/src/components/molecules/combobox/combobox';
import {
  Field,
  FieldError,
  FieldLabel,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';

import { TRANSACTION_TYPE } from '@/constants/transaction';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { useTransactionForm } from './hooks/use-transaction-form';
import styles from './TransactionForm.module.scss';

interface TransactionFormProps {
  isOpen: boolean;
  transaction: TransactionResponseDto | null;
  onClose: () => void;
  onSuccess: (transaction: TransactionResponseDto) => void;
}

export const TransactionForm: FC<TransactionFormProps> = ({
  isOpen,
  transaction,
  onClose,
  onSuccess,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);
  const dialogRef = useRef<HTMLDivElement>(null);

  const {
    isEditing,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    categoryOptionList,
    handleTypeChange,
    handleFormSubmit,
  } = useTransactionForm({ isOpen, transaction, onSuccess });

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent ref={dialogRef}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isEditing
              ? translations('content.editTransaction')
              : translations('content.createButton')}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <Field>
            <FieldLabel>{translations('content.typeLabel')}</FieldLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={handleTypeChange}>
                  <SelectTrigger error={Boolean(errors.type)}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TRANSACTION_TYPE.EXPENSE}>
                      {translations('content.expenseType')}
                    </SelectItem>
                    <SelectItem value={TRANSACTION_TYPE.INCOME}>
                      {translations('content.incomeType')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={errors.type ? [errors.type] : undefined} />
          </Field>

          <Field>
            <FieldLabel>{translations('content.categoryLabel')}</FieldLabel>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => {
                const handleCategoryChange = field.onChange;
                return (
                  <Combobox
                    optionList={categoryOptionList}
                    value={field.value}
                    onValueChange={handleCategoryChange}
                    placeholder={translations('content.categoryPlaceholder')}
                    container={dialogRef.current}
                  />
                );
              }}
            />
            <FieldError errors={errors.categoryId ? [errors.categoryId] : undefined} />
          </Field>

          <Field>
            <FieldLabel htmlFor="transaction-amount">
              {translations('content.amountLabel')}
            </FieldLabel>
            <Input
              id="transaction-amount"
              type="number"
              step="0.01"
              min="0"
              placeholder={translations('content.amountPlaceholder')}
              error={Boolean(errors.amount)}
              {...register('amount')}
            />
            <FieldError errors={errors.amount ? [errors.amount] : undefined} />
          </Field>

          <Field>
            <FieldLabel>{translations('content.currencyLabel')}</FieldLabel>
            <Controller
              name="currencyCode"
              control={control}
              render={({ field }) => {
                const handleCurrencyChange = field.onChange;
                return (
                  <Select value={field.value} onValueChange={handleCurrencyChange}>
                    <SelectTrigger error={Boolean(errors.currencyCode)}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="UAH">UAH</SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            <FieldError errors={errors.currencyCode ? [errors.currencyCode] : undefined} />
          </Field>

          <Field>
            <FieldLabel htmlFor="transaction-date">{translations('content.dateLabel')}</FieldLabel>
            <Input
              id="transaction-date"
              type="date"
              error={Boolean(errors.date)}
              {...register('date')}
            />
            <FieldError errors={errors.date ? [errors.date] : undefined} />
          </Field>

          <Field>
            <FieldLabel htmlFor="transaction-description">
              {translations('content.descriptionLabel')}
            </FieldLabel>
            <Input
              id="transaction-description"
              placeholder={translations('content.descriptionPlaceholder')}
              {...register('description')}
            />
          </Field>

          <AlertDialogFooter>
            <AlertDialogCancel>
              <Button variant="outline" type="button">
                {translations('content.cancel')}
              </Button>
            </AlertDialogCancel>
            <Button type="submit" disabled={isSubmitting}>
              {isEditing
                ? translations('content.editTransaction')
                : translations('content.createButton')}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
