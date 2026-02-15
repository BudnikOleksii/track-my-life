'use client';

import type { FieldErrorList } from '@track-my-life/shared/src/types/field-error';
import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { AuthFormValues } from '@/app/[locale]/(auth-layout)/constants/auth-form-schema';
import type { AuthAction } from '@/app/[locale]/(auth-layout)/types/auth-action';

import { authFormSchema } from '@/app/[locale]/(auth-layout)/constants/auth-form-schema';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import styles from './AuthForm.module.scss';

interface Props {
  action: AuthAction;
  submitText: string;
}

export const AuthForm: FC<Props> = ({ action, submitText }) => {
  const tAuthShared = useTranslations(I18N_NAMESPACE.authShared);
  const tAuthErrors = useTranslations(`${I18N_NAMESPACE.authShared}.errors`);
  const [serverErrorList, setServerErrorList] = useState<FieldErrorList | null>(null);
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const onSubmit = async (data: AuthFormValues) => {
    setServerErrorList(null);
    setIsPending(true);
    const res = await action(data);

    if (res?.errors) {
      setServerErrorList(
        res.errors.map((error) => ({
          message: tAuthErrors(error.message),
        })),
      );
    }

    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">
              <FieldTitle>{tAuthShared('email')}</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder={tAuthShared('emailPlaceholder')}
                aria-invalid={Boolean(errors.email)}
                {...register('email')}
              />
            </FieldContent>
            {errors.email?.message && (
              <FieldError errors={[{ message: tAuthErrors(errors.email.message) }]} />
            )}
            <FieldDescription>{tAuthShared('emailPlaceholder')}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">
              <FieldTitle>{tAuthShared('password')}</FieldTitle>
            </FieldLabel>
            <FieldContent>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder={tAuthShared('passwordPlaceholder')}
                aria-invalid={Boolean(errors.password)}
                {...register('password')}
              />
            </FieldContent>
            {errors.password?.message && (
              <FieldError errors={[{ message: tAuthErrors(errors.password.message) }]} />
            )}
            <FieldDescription>{tAuthShared('passwordPlaceholder')}</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
      {serverErrorList && <FieldError errors={serverErrorList} />}

      <Button type="submit" className={styles.submitButton} disabled={isPending}>
        {submitText}
      </Button>
    </form>
  );
};
