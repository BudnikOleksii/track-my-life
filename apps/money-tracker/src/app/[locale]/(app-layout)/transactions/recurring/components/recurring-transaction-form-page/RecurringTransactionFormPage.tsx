'use client';

import type {
  CategoryResponseDto,
  CurrencyCode,
  RecurringTransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Link, useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
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

import { useRecurringTransactionFormPage } from './hooks/use-recurring-transaction-form-page';
import styles from './RecurringTransactionFormPage.module.scss';

interface RecurringTransactionFormPageProps {
  recurringTransaction: RecurringTransactionResponseDto | null;
  categoryList: CategoryResponseDto[];
  baseCurrencyCode: CurrencyCode | null;
}

export const RecurringTransactionFormPage: FC<RecurringTransactionFormPageProps> = ({
  recurringTransaction,
  categoryList,
  baseCurrencyCode,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.recurringTransactionsFormPage);
  const router = useRouter();

  const {
    isEditing,
    register,
    handleSubmit,
    control,
    errors,
    isPending,
    categoryOptionList,
    handleTypeChange,
    handleFormSubmit,
  } = useRecurringTransactionFormPage({
    recurringTransaction,
    categoryList,
    baseCurrencyCode,
    translations,
  });

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
          htmlFor="recurring-transaction-amount"
          error={errors.amount}
        >
          <Input
            id="recurring-transaction-amount"
            type="number"
            step="0.01"
            min="0"
            placeholder={translations('content.amountPlaceholder')}
            error={Boolean(errors.amount)}
            {...register('amount')}
          />
        </FormField>

        <Field>
          <FieldLabel htmlFor="recurring-transaction-currency">
            {translations('content.currencyLabel')}
          </FieldLabel>
          <Input id="recurring-transaction-currency" readOnly {...register('currencyCode')} />
        </Field>

        <FormField label={translations('content.frequencyLabel')} error={errors.frequency}>
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
        </FormField>

        <FormField
          label={translations('content.intervalLabel')}
          htmlFor="recurring-transaction-interval"
          error={errors.interval}
        >
          <Input
            id="recurring-transaction-interval"
            type="number"
            min="1"
            step="1"
            placeholder={translations('content.intervalPlaceholder')}
            error={Boolean(errors.interval)}
            {...register('interval', { valueAsNumber: true })}
          />
        </FormField>

        <FormField
          label={translations('content.startDateLabel')}
          htmlFor="recurring-transaction-start-date"
          error={errors.startDate}
        >
          <Input
            id="recurring-transaction-start-date"
            type="date"
            error={Boolean(errors.startDate)}
            {...register('startDate')}
          />
        </FormField>

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
          <Button type="submit" disabled={isPending}>
            {isEditing ? translations('content.save') : translations('content.createButton')}
          </Button>
        </div>
      </form>
    </div>
  );
};
