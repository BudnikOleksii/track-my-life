'use client';

import type { FC } from 'react';

import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import { FormField } from '@track-my-life/ui/src/components/molecules/field/field';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './ChangePasswordForm.module.scss';
import { useChangePasswordForm } from './hooks/use-change-password-form';

export const ChangePasswordForm: FC = () => {
  const translations = useTranslations(I18N_NAMESPACE.settingsPage);
  const tErrors = useTranslations(`${I18N_NAMESPACE.settingsPage}.errors`);

  const { register, handleSubmit, errors, isPending, handleFormSubmit } = useChangePasswordForm({
    translations,
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <FormField
        label={translations('content.currentPasswordLabel')}
        htmlFor="current-password"
        error={
          errors.currentPassword?.message
            ? { message: tErrors(errors.currentPassword.message) }
            : undefined
        }
      >
        <Input
          id="current-password"
          type="password"
          placeholder={translations('content.currentPasswordPlaceholder')}
          error={Boolean(errors.currentPassword)}
          {...register('currentPassword')}
        />
      </FormField>

      <FormField
        label={translations('content.newPasswordLabel')}
        htmlFor="new-password"
        error={
          errors.newPassword?.message ? { message: tErrors(errors.newPassword.message) } : undefined
        }
      >
        <Input
          id="new-password"
          type="password"
          placeholder={translations('content.newPasswordPlaceholder')}
          error={Boolean(errors.newPassword)}
          {...register('newPassword')}
        />
      </FormField>

      <div className={styles.actions}>
        <Button type="submit" disabled={isPending}>
          {translations('content.changePasswordButton')}
        </Button>
      </div>
    </form>
  );
};
