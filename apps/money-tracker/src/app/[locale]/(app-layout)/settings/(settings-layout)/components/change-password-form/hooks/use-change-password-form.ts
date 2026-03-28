import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import type { ChangePasswordFormValues } from '../../../constants/change-password-form-schema';

import { changePassword } from '../../../actions/change-password';
import { changePasswordFormSchema } from '../../../constants/change-password-form-schema';

interface UseChangePasswordFormParams {
  translations: (key: string) => string;
}

export const useChangePasswordForm = ({ translations }: UseChangePasswordFormParams) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const handleFormSubmit = useCallback(
    async (values: ChangePasswordFormValues) => {
      try {
        const result = await changePassword(values);
        if (result) {
          toast.success(translations('content.passwordChangeSuccess'));
          reset();
        } else {
          toast.error(translations('content.passwordChangeError'));
        }
      } catch {
        toast.error(translations('content.passwordChangeError'));
      }
    },
    [translations, reset],
  );

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleFormSubmit,
  };
};
