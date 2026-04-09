'use client';

import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import {
  Field,
  FieldError,
  FieldLabel,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useTranslations } from 'next-intl';
import { useCallback, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { PasswordStepValues } from '../../constants/password-step-schema';

import { completeOnboarding } from '../../actions/complete-onboarding';
import { passwordStepSchema } from '../../constants/password-step-schema';
import styles from './PasswordStep.module.scss';

interface PasswordStepProps {
  currency: string;
}

export const PasswordStep: FC<PasswordStepProps> = ({ currency }) => {
  const translations = useTranslations(I18N_NAMESPACE.onboardingPage);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordStepValues>({
    resolver: zodResolver(passwordStepSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleFormSubmit = useCallback(
    (values: PasswordStepValues) => {
      startTransition(async () => {
        const result = await completeOnboarding({
          baseCurrencyCode: currency,
          password: values.password,
        });

        if (result?.error) {
          toast.error(translations('content.completeError'));
        }
      });
    },
    [currency, translations],
  );

  const handleSkip = useCallback(() => {
    startTransition(async () => {
      const result = await completeOnboarding({ baseCurrencyCode: currency });

      if (result?.error) {
        toast.error(translations('content.completeError'));
      }
    });
  }, [currency, translations]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <Field>
        <FieldLabel htmlFor="onboarding-password">
          {translations('content.passwordLabel')}
        </FieldLabel>
        <Input
          id="onboarding-password"
          type="password"
          placeholder={translations('content.passwordPlaceholder')}
          error={Boolean(errors.password)}
          {...register('password')}
        />
        <FieldError errors={errors.password ? [errors.password] : undefined} />
      </Field>

      <Field>
        <FieldLabel htmlFor="onboarding-confirm-password">
          {translations('content.confirmPasswordLabel')}
        </FieldLabel>
        <Input
          id="onboarding-confirm-password"
          type="password"
          placeholder={translations('content.confirmPasswordPlaceholder')}
          error={Boolean(errors.confirmPassword)}
          {...register('confirmPassword')}
        />
        <FieldError errors={errors.confirmPassword ? [errors.confirmPassword] : undefined} />
      </Field>

      <div className={styles.actions}>
        <Button type="submit" disabled={isPending}>
          {translations('content.setPasswordButton')}
        </Button>
        <Button variant="link" type="button" onClick={handleSkip} disabled={isPending}>
          {translations('content.skipPasswordButton')}
        </Button>
      </div>
    </form>
  );
};
