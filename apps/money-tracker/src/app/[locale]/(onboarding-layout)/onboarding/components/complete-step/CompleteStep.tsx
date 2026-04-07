'use client';

import type { FC } from 'react';

import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { useTranslations } from 'next-intl';
import { useCallback, useTransition } from 'react';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { completeOnboarding } from '../../actions/complete-onboarding';

export const CompleteStep: FC = () => {
  const translations = useTranslations(I18N_NAMESPACE.onboardingPage);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleGoToDashboard = useCallback(() => {
    startTransition(async () => {
      await completeOnboarding();
      router.replace(PATHS.dashboard);
    });
  }, [router]);

  return (
    <Button onClick={handleGoToDashboard} disabled={isPending}>
      {translations('content.goToDashboardButton')}
    </Button>
  );
};
