'use client';

import type { FC } from 'react';

import { useRouter } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { useTranslations } from 'next-intl';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { ONBOARDING_STEP } from '../../constants/onboarding-step';
import { SkipButton } from '../skip-button/SkipButton';
import styles from './WelcomeStep.module.scss';

export const WelcomeStep: FC = () => {
  const translations = useTranslations(I18N_NAMESPACE.onboardingPage);
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace(`${PATHS.onboarding}?step=${ONBOARDING_STEP.profile}`);
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleGetStarted}>{translations('content.getStartedButton')}</Button>
      <SkipButton />
    </div>
  );
};
