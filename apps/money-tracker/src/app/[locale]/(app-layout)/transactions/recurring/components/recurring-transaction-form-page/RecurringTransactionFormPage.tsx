'use client';

import type {
  CategoryResponseDto,
  RecurringTransactionResponseDto,
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

import { useRecurringTransactionFormPage } from './hooks/use-recurring-transaction-form-page';
import styles from './RecurringTransactionFormPage.module.scss';

interface RecurringTransactionFormPageProps {
  recurringTransaction: RecurringTransactionResponseDto | null;
  categoryList: CategoryResponseDto[];
}

export const RecurringTransactionFormPage: FC<RecurringTransactionFormPageProps> = ({
  recurringTransaction,
  categoryList,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.recurringTransactionsFormPage);
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
  } = useRecurringTransactionFormPage({ recurringTransaction, categoryList, translations });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link
          href={PATHS.recurringTransactions}
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
          <FieldLabel htmlFor="recurring-transaction-amount">
            {translations('content.amountLabel')}
          </FieldLabel>
          <Input
            id="recurring-transaction-amount"
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
          <FieldLabel>{translations('content.frequencyLabel')}</FieldLabel>
          <Controller
            name="frequency"
            control={control}
            render={({ field }) => {
              const handleFrequencyChange = field.onChange;
              return (
                <Select value={field.value} onValueChange={handleFrequencyChange}>
                  <SelectTrigger error={Boolean(errors.frequency)}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DAILY">{translations('content.dailyFrequency')}</SelectItem>
                    <SelectItem value="WEEKLY">
                      {translations('content.weeklyFrequency')}
                    </SelectItem>
                    <SelectItem value="MONTHLY">
                      {translations('content.monthlyFrequency')}
                    </SelectItem>
                    <SelectItem value="YEARLY">
                      {translations('content.yearlyFrequency')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          />
          <FieldError errors={errors.frequency ? [errors.frequency] : undefined} />
        </Field>

        <Field>
          <FieldLabel htmlFor="recurring-transaction-interval">
            {translations('content.intervalLabel')}
          </FieldLabel>
          <Input
            id="recurring-transaction-interval"
            type="number"
            min="1"
            step="1"
            placeholder={translations('content.intervalPlaceholder')}
            error={Boolean(errors.interval)}
            {...register('interval', { valueAsNumber: true })}
          />
          <FieldError errors={errors.interval ? [errors.interval] : undefined} />
        </Field>

        <Field>
          <FieldLabel htmlFor="recurring-transaction-start-date">
            {translations('content.startDateLabel')}
          </FieldLabel>
          <Input
            id="recurring-transaction-start-date"
            type="date"
            error={Boolean(errors.startDate)}
            {...register('startDate')}
          />
          <FieldError errors={errors.startDate ? [errors.startDate] : undefined} />
        </Field>

        <Field>
          <FieldLabel htmlFor="recurring-transaction-end-date">
            {translations('content.endDateLabel')}
          </FieldLabel>
          <Input id="recurring-transaction-end-date" type="date" {...register('endDate')} />
        </Field>

        <Field>
          <FieldLabel htmlFor="recurring-transaction-description">
            {translations('content.descriptionLabel')}
          </FieldLabel>
          <Input
            id="recurring-transaction-description"
            placeholder={translations('content.descriptionPlaceholder')}
            {...register('description')}
          />
        </Field>

        <div className={styles.actions}>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              router.push(PATHS.recurringTransactions);
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
