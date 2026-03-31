'use client';

import type {
  CategoryResponseDto,
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
  FieldError,
  FieldLabel,
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
}

export const TransactionFormPage: FC<TransactionFormPageProps> = ({
  transaction,
  categoryList,
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
  } = useTransactionFormPage({ transaction, categoryList, translations });

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
                  error={Boolean(errors.categoryId)}
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
