import type { CountryCode } from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { PATHS } from '@/constants/paths';

import type { ProfileFormValues } from '../../../../../(app-layout)/settings/constants/profile-form-schema';

import { profileFormSchema } from '../../../../../(app-layout)/settings/constants/profile-form-schema';
import { updateOnboardingProfile } from '../../../actions/update-onboarding-profile';
import { ONBOARDING_STEP } from '../../../constants/onboarding-step';

interface UseOnboardingProfileFormParams {
  translations: (key: string) => string;
}

export const useOnboardingProfileForm = ({ translations }: UseOnboardingProfileFormParams) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      countryCode: '',
    },
  });

  const handleFormSubmit = useCallback(
    async (values: ProfileFormValues) => {
      const body = {
        ...(values.firstName && { firstName: values.firstName }),
        ...(values.lastName && { lastName: values.lastName }),
        ...(values.countryCode && { countryCode: values.countryCode as CountryCode }),
        ...(values.baseCurrencyCode && { baseCurrencyCode: values.baseCurrencyCode }),
      };

      try {
        const result = await updateOnboardingProfile(body);

        if (result) {
          router.replace(`${PATHS.onboarding}?step=${ONBOARDING_STEP.complete}`);
        } else {
          toast.error(translations('content.profileUpdateError'));
        }
      } catch {
        toast.error(translations('content.profileUpdateError'));
      }
    },
    [translations, router],
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
