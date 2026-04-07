import type { CountryCode } from '@track-my-life/shared/src/api/generated/types.gen';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useActionState, useCallback, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import type { ActionState } from '@/constants/action-state';

import { INITIAL_ACTION_STATE } from '@/constants/action-state';
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
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      countryCode: '',
    },
  });

  const [isPending, startTransition] = useTransition();
  const [, submitAction] = useActionState(
    async (_prev: ActionState, values: ProfileFormValues): Promise<ActionState> => {
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
          return { success: true, error: null };
        }
        toast.error(translations('content.profileUpdateError'));
        return { success: false, error: 'content.profileUpdateError' };
      } catch {
        toast.error(translations('content.profileUpdateError'));
        return { success: false, error: 'content.profileUpdateError' };
      }
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
