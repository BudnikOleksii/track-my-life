'use client';

import type { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Input } from '@track-my-life/ui/src/components/atoms/input/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@track-my-life/ui/src/components/molecules/alert-dialog/alert-dialog';
import {
  Field,
  FieldError,
  FieldLabel,
} from '@track-my-life/ui/src/components/molecules/field/field';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { DeleteAccountFormValues } from '../../constants/delete-account-form-schema';

import { deleteAccount } from '../../actions/delete-account';
import { deleteAccountFormSchema } from '../../constants/delete-account-form-schema';
import styles from './DeleteAccountSection.module.scss';

export const DeleteAccountSection: FC = () => {
  const translations = useTranslations(I18N_NAMESPACE.settingsPage);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountFormSchema),
    defaultValues: {
      password: '',
    },
  });

  const handleFormSubmit = useCallback(
    async (values: DeleteAccountFormValues) => {
      try {
        const result = await deleteAccount(values);
        if (!result) {
          toast.error(translations('content.deleteAccountError'));
        }
      } catch {
        toast.error(translations('content.deleteAccountError'));
      }
    },
    [translations],
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        reset();
      }
    },
    [reset],
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{translations('content.deleteAccountButton')}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{translations('content.deleteAccountTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {translations('content.deleteAccountDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <Field>
            <FieldLabel htmlFor="delete-account-password">
              {translations('content.deleteAccountPasswordLabel')}
            </FieldLabel>
            <Input
              id="delete-account-password"
              type="password"
              placeholder={translations('content.deleteAccountPasswordPlaceholder')}
              error={Boolean(errors.password)}
              {...register('password')}
            />
            <FieldError errors={errors.password ? [errors.password] : undefined} />
          </Field>

          <AlertDialogFooter>
            <AlertDialogCancel>
              <Button variant="outline" type="button">
                {translations('content.cancelButton')}
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                await handleSubmit(handleFormSubmit)();
              }}
            >
              <Button variant="destructive" type="button" disabled={isSubmitting}>
                {translations('content.deleteAccountConfirmButton')}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
