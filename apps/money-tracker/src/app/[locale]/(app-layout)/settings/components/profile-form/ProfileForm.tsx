'use client';

import type { ProfileResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import { Combobox } from '@track-my-life/ui/src/components/molecules/combobox/combobox';
import { FormField } from '@track-my-life/ui/src/components/molecules/field/field';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { COUNTRY_OPTION_LIST } from '../../constants/country-option-list';
import { CURRENCY_OPTION_LIST } from '../../constants/currency-option-list';
import { useProfileForm } from './hooks/use-profile-form';
import styles from './ProfileForm.module.scss';

interface ProfileFormProps {
  profile: ProfileResponseDto;
}

export const ProfileForm: FC<ProfileFormProps> = ({ profile }) => {
  const translations = useTranslations(I18N_NAMESPACE.settingsPage);

  const { register, handleSubmit, control, errors, isSubmitting, handleFormSubmit } =
    useProfileForm({ profile, translations });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <FormField
        label={translations('content.firstNameLabel')}
        htmlFor="profile-first-name"
        error={errors.firstName}
      >
        <Input
          id="profile-first-name"
          placeholder={translations('content.firstNamePlaceholder')}
          error={Boolean(errors.firstName)}
          {...register('firstName')}
        />
      </FormField>

      <FormField
        label={translations('content.lastNameLabel')}
        htmlFor="profile-last-name"
        error={errors.lastName}
      >
        <Input
          id="profile-last-name"
          placeholder={translations('content.lastNamePlaceholder')}
          error={Boolean(errors.lastName)}
          {...register('lastName')}
        />
      </FormField>

      <FormField label={translations('content.countryLabel')} error={errors.countryCode}>
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
      </FormField>

      <FormField label={translations('content.baseCurrencyLabel')} error={errors.baseCurrencyCode}>
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
      </FormField>

      <div className={styles.actions}>
        <Button type="submit" disabled={isSubmitting}>
          {translations('content.saveButton')}
        </Button>
      </div>
    </form>
  );
};
