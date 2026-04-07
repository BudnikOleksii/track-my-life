'use client';

import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import { Combobox } from '@track-my-life/ui/src/components/molecules/combobox/combobox';
import {
  Field,
  FieldError,
  FieldLabel,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { COUNTRY_OPTION_LIST } from '../../../../(app-layout)/settings/constants/country-option-list';
import { CURRENCY_OPTION_LIST } from '../../../../(app-layout)/settings/constants/currency-option-list';
import { SkipButton } from '../skip-button/SkipButton';
import { useOnboardingProfileForm } from './hooks/use-onboarding-profile-form';
import styles from './ProfileStep.module.scss';

export const ProfileStep: FC = () => {
  const translations = useTranslations(I18N_NAMESPACE.onboardingPage);

  const { register, handleSubmit, control, errors, isPending, handleFormSubmit } =
    useOnboardingProfileForm({ translations });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <Field>
        <FieldLabel htmlFor="onboarding-first-name">
          {translations('content.firstNameLabel')}
        </FieldLabel>
        <Input
          id="onboarding-first-name"
          placeholder={translations('content.firstNamePlaceholder')}
          error={Boolean(errors.firstName)}
          {...register('firstName')}
        />
        <FieldError errors={errors.firstName ? [errors.firstName] : undefined} />
      </Field>

      <Field>
        <FieldLabel htmlFor="onboarding-last-name">
          {translations('content.lastNameLabel')}
        </FieldLabel>
        <Input
          id="onboarding-last-name"
          placeholder={translations('content.lastNamePlaceholder')}
          error={Boolean(errors.lastName)}
          {...register('lastName')}
        />
        <FieldError errors={errors.lastName ? [errors.lastName] : undefined} />
      </Field>

      <Field>
        <FieldLabel>{translations('content.countryLabel')}</FieldLabel>
        <Controller
          name="countryCode"
          control={control}
          render={({ field }) => {
            const handleCountryChange = field.onChange;
            return (
              <Combobox
                optionList={COUNTRY_OPTION_LIST}
                value={field.value ?? ''}
                onValueChange={handleCountryChange}
                placeholder={translations('content.countryPlaceholder')}
                error={Boolean(errors.countryCode)}
              />
            );
          }}
        />
        <FieldError errors={errors.countryCode ? [errors.countryCode] : undefined} />
      </Field>

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

      <div className={styles.actions}>
        <Button type="submit" disabled={isPending}>
          {translations('content.continueButton')}
        </Button>
        <SkipButton />
      </div>
    </form>
  );
};
