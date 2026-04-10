import type {
  CountryCode,
  ProfileResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useActionState, useCallback, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import type { ActionState } from '@/constants/action-state';

import { INITIAL_ACTION_STATE } from '@/constants/action-state';

import type { ProfileFormValues } from '../../../constants/profile-form-schema';

import { updateProfile } from '../../../actions/update-profile';
import { profileFormSchema } from '../../../constants/profile-form-schema';

const convertToString = (value: unknown): string => (typeof value === 'string' ? value : '');

interface UseProfileFormParams {
  profile: ProfileResponseDto;
  translations: (key: string) => string;
}

export const useProfileForm = ({ profile, translations }: UseProfileFormParams) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      countryCode: '',
    },
  });

  useEffect(() => {
    reset({
      firstName: convertToString(profile.firstName),
      lastName: convertToString(profile.lastName),
      countryCode: profile.countryCode ?? '',
      ...(profile.baseCurrencyCode && { baseCurrencyCode: profile.baseCurrencyCode }),
    });
  }, [profile, reset]);

  const [isPending, startTransition] = useTransition();
  const [, submitAction] = useActionState(
    async (_prev: ActionState, values: ProfileFormValues): Promise<ActionState> => {
      const body = {
        ...(values.firstName && { firstName: values.firstName }),
        ...(values.lastName && { lastName: values.lastName }),
        ...(values.countryCode && { countryCode: values.countryCode as CountryCode }),
        ...(values.baseCurrencyCode && { baseCurrencyCode: values.baseCurrencyCode }),
      };

      const result = await updateProfile(body);
      if (result.ok) {
        toast.success(translations('content.profileUpdateSuccess'));
        return { success: true, error: null };
      }
      toast.error(translations('content.profileUpdateError'));
      return { success: false, error: 'content.profileUpdateError' };
    },
    INITIAL_ACTION_STATE,
  );

  const handleFormSubmit = useCallback(
    (values: ProfileFormValues) => {
      startTransition(() => {
        submitAction(values);
      });
    },
    [submitAction],
  );

  return {
    register,
    handleSubmit,
    control,
    errors,
    isPending,
    handleFormSubmit,
  };
};
