import type {
  CountryCode,
  CurrencyCode,
  ProfileResponseDto,
} from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      countryCode: '',
      baseCurrencyCode: '',
    },
  });

  useEffect(() => {
    reset({
      firstName: convertToString(profile.firstName),
      lastName: convertToString(profile.lastName),
      countryCode: profile.countryCode ?? '',
      baseCurrencyCode: profile.baseCurrencyCode ?? '',
    });
  }, [profile, reset]);

  const handleFormSubmit = useCallback(
    async (values: ProfileFormValues) => {
      const body = {
        ...(values.firstName && { firstName: values.firstName }),
        ...(values.lastName && { lastName: values.lastName }),
        ...(values.countryCode && { countryCode: values.countryCode as CountryCode }),
        ...(values.baseCurrencyCode && {
          baseCurrencyCode: values.baseCurrencyCode as CurrencyCode,
        }),
      };

      try {
        const result = await updateProfile(body);
        if (result) {
          toast.success(translations('content.profileUpdateSuccess'));
        } else {
          toast.error(translations('content.profileUpdateError'));
        }
      } catch {
        toast.error(translations('content.profileUpdateError'));
      }
    },
    [translations],
  );

  return {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    handleFormSubmit,
  };
};
