'use client';

import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Combobox } from '@track-my-life/ui/src/components/molecules/combobox/combobox';
import {
  Field,
  FieldError,
  FieldLabel,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { CurrencyStepValues } from '../../constants/currency-step-schema';

import { CURRENCY_OPTION_LIST } from '../../../../(app-layout)/settings/constants/currency-option-list';
import { currencyStepSchema } from '../../constants/currency-step-schema';
import { ONBOARDING_STEP } from '../../constants/onboarding-step';
import styles from './CurrencyStep.module.scss';

interface CurrencyStepProps {
  defaultCurrency?: string | undefined;
}

export const CurrencyStep: FC<CurrencyStepProps> = ({ defaultCurrency }) => {
  const translations = useTranslations(I18N_NAMESPACE.onboardingPage);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CurrencyStepValues>({
    resolver: zodResolver(currencyStepSchema),
    defaultValues: {
      baseCurrencyCode: (defaultCurrency ?? '') as CurrencyStepValues['baseCurrencyCode'],
    },
  });

  const handleFormSubmit = (values: CurrencyStepValues) => {
    router.replace(
      `${PATHS.onboarding}?step=${ONBOARDING_STEP.categories}&currency=${values.baseCurrencyCode}`,
    );
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <Field>
        <FieldLabel>{translations('content.baseCurrencyLabel')}</FieldLabel>
        <Controller
          name="baseCurrencyCode"
          control={control}
          render={({ field }) => {
            const handleCurrencyChange = field.onChange;
            return (
              <Combobox
                optionList={CURRENCY_OPTION_LIST}
                value={field.value ?? ''}
                onValueChange={handleCurrencyChange}
                placeholder={translations('content.baseCurrencyPlaceholder')}
                error={Boolean(errors.baseCurrencyCode)}
              />
            );
          }}
        />
        <FieldError errors={errors.baseCurrencyCode ? [errors.baseCurrencyCode] : undefined} />
      </Field>

      <Button type="submit">{translations('content.continueButton')}</Button>
    </form>
  );
};
