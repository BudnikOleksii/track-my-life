import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useActionState, useCallback, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import type { ActionState } from '@/constants/action-state';

import { INITIAL_ACTION_STATE } from '@/constants/action-state';

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
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const [isPending, startTransition] = useTransition();
  const [, submitAction] = useActionState(
    async (_prev: ActionState, values: ChangePasswordFormValues): Promise<ActionState> => {
      try {
        const result = await changePassword(values);
        if (result) {
          toast.success(translations('content.passwordChangeSuccess'));
          reset();
          return { success: true, error: null };
        }
        toast.error(translations('content.passwordChangeError'));
        return { success: false, error: 'content.passwordChangeError' };
      } catch {
        toast.error(translations('content.passwordChangeError'));
        return { success: false, error: 'content.passwordChangeError' };
      }
    },
    INITIAL_ACTION_STATE,
  );

  const handleFormSubmit = useCallback(
    (values: ChangePasswordFormValues) => {
      startTransition(() => {
        submitAction(values);
      });
    },
    [submitAction],
  );

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    handleFormSubmit,
  };
};
