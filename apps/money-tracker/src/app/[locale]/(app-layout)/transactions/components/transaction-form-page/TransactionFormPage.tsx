'use client';

import type {
  CategoryResponseDto,
  CurrencyCode,
  TransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Link, useRouter } from '@track-my-life/shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@track-my-life/ui/src/components/atoms/select/select';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { Combobox } from '@track-my-life/ui/src/components/molecules/combobox/combobox';
import {
  Field,
  FieldLabel,
  FormField,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { PATHS } from '@/constants/paths';
import { TRANSACTION_TYPE } from '@/constants/transaction';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { useTransactionFormPage } from './hooks/use-transaction-form-page';
import styles from './TransactionFormPage.module.scss';

interface TransactionFormPageProps {
  transaction: TransactionResponseDto | null;
  categoryList: CategoryResponseDto[];
  baseCurrencyCode: CurrencyCode | null;
}

export const TransactionFormPage: FC<TransactionFormPageProps> = ({
  transaction,
  categoryList,
  baseCurrencyCode,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsFormPage);
  const router = useRouter();

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
  } = useTransactionFormPage({ transaction, categoryList, baseCurrencyCode, translations });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link
          href={PATHS.transactions}
          className={styles.backLink}
          aria-label={translations('content.backToList')}
        >
          <ArrowLeft size={20} />
        </Link>
        <Typography variant="title-l">
          {isEditing
            ? translations('content.editPageTitle')
            : translations('content.createPageTitle')}
        </Typography>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <FormField label={translations('content.typeLabel')} error={errors.type}>
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
        </FormField>

        <FormField label={translations('content.categoryLabel')} error={errors.categoryId}>
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
                  error={Boolean(errors.categoryId)}
                />
              );
            }}
          />
        </FormField>

        <FormField
          label={translations('content.amountLabel')}
          htmlFor="transaction-amount"
          error={errors.amount}
        >
          <Input
            id="transaction-amount"
            type="number"
            step="0.01"
            min="0"
            placeholder={translations('content.amountPlaceholder')}
            error={Boolean(errors.amount)}
            {...register('amount')}
          />
        </FormField>

        <Field>
          <FieldLabel htmlFor="transaction-currency">
            {translations('content.currencyLabel')}
          </FieldLabel>
          <Input id="transaction-currency" readOnly {...register('currencyCode')} />
        </Field>

        <FormField
          label={translations('content.dateLabel')}
          htmlFor="transaction-date"
          error={errors.date}
        >
          <Input
            id="transaction-date"
            type="date"
            error={Boolean(errors.date)}
            {...register('date')}
          />
        </FormField>

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

        <div className={styles.actions}>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              router.push(PATHS.transactions);
            }}
          >
            {translations('content.cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? translations('content.save') : translations('content.createButton')}
          </Button>
        </div>
      </form>
    </div>
  );
};
