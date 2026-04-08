'use client';

import type {
  CategoryResponseDto,
  CurrencyCode,
  TransactionResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Link, useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import {
  RadioGroup,
  RadioGroupItem,
} from '@track-my-life/ui/src/components/atoms/radio-group/radio-group';
import { TimePicker } from '@track-my-life/ui/src/components/atoms/time-picker/time-picker';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
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

import { CategoryPicker } from '../category-picker/CategoryPicker';
import { useTransactionFormPage } from './hooks/use-transaction-form-page';
import styles from './TransactionFormPage.module.scss';

interface TransactionFormPageProps {
  transaction: TransactionResponseDto | null;
  sourceTransaction?: TransactionResponseDto | null;
  categoryList: CategoryResponseDto[];
  baseCurrencyCode: CurrencyCode | null;
}

export const TransactionFormPage: FC<TransactionFormPageProps> = ({
  transaction,
  sourceTransaction,
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
    isPending,
    selectedType,
    handleTypeChange,
    handleFormSubmit,
  } = useTransactionFormPage({
    transaction,
    sourceTransaction: sourceTransaction ?? null,
    categoryList,
    baseCurrencyCode,
    translations,
  });

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
              <RadioGroup value={field.value} onValueChange={handleTypeChange}>
                <RadioGroupItem value={TRANSACTION_TYPE.INCOME}>
                  {translations('content.incomeType')}
                </RadioGroupItem>
                <RadioGroupItem value={TRANSACTION_TYPE.EXPENSE}>
                  {translations('content.expenseType')}
                </RadioGroupItem>
              </RadioGroup>
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
                <CategoryPicker
                  categoryList={categoryList}
                  transactionType={selectedType}
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
            startAdornment={baseCurrencyCode}
            {...register('amount')}
          />
        </FormField>

        <div className={styles.dateTimeRow}>
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

          <FormField label={translations('content.timeLabel')} error={errors.time}>
            <Controller
              name="time"
              control={control}
              render={({ field }) => {
                const handleTimeChange = field.onChange;
                return <TimePicker value={field.value} onChange={handleTimeChange} />;
              }}
            />
          </FormField>
        </div>

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
          <Button type="submit" disabled={isPending}>
            {isEditing ? translations('content.save') : translations('content.createButton')}
          </Button>
        </div>
      </form>
    </div>
  );
};
