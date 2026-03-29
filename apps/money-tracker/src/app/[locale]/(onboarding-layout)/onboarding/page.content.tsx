'use client';

import type { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@track-my-life/ui/src/components/molecules/card/card';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { OnboardingStep } from './constants/onboarding-step';

import { CompleteStep } from './components/complete-step/CompleteStep';
import { ProfileStep } from './components/profile-step/ProfileStep';
import { StepIndicator } from './components/step-indicator/StepIndicator';
import { WelcomeStep } from './components/welcome-step/WelcomeStep';
import { ONBOARDING_STEP } from './constants/onboarding-step';
import styles from './page.module.scss';

interface OnboardingPageContentProps {
  currentStep: OnboardingStep;
}

const STEP_TITLE_MAP: Record<OnboardingStep, string> = {
  [ONBOARDING_STEP.welcome]: 'content.welcomeTitle',
  [ONBOARDING_STEP.profile]: 'content.profileTitle',
  [ONBOARDING_STEP.complete]: 'content.completeTitle',
};

const STEP_DESCRIPTION_MAP: Record<OnboardingStep, string> = {
  [ONBOARDING_STEP.welcome]: 'content.welcomeDescription',
  [ONBOARDING_STEP.profile]: 'content.profileDescription',
  [ONBOARDING_STEP.complete]: 'content.completeDescription',
};

const STEP_CONTENT_MAP: Record<OnboardingStep, FC> = {
  [ONBOARDING_STEP.welcome]: <WelcomeStep />,
  [ONBOARDING_STEP.profile]: <ProfileStep />,
  [ONBOARDING_STEP.complete]: <CompleteStep />,
};

export const OnboardingPageContent: FC<OnboardingPageContentProps> = ({ currentStep }) => {
  const translations = useTranslations(I18N_NAMESPACE.onboardingPage);

  const titleKey = STEP_TITLE_MAP[currentStep];
  const descriptionKey = STEP_DESCRIPTION_MAP[currentStep];

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <StepIndicator currentStep={currentStep} />
        <CardTitle>{translations(titleKey)}</CardTitle>
        <CardDescription>{translations(descriptionKey)}</CardDescription>
      </CardHeader>

      <CardContent className={styles.cardContent}>{STEP_CONTENT_MAP[currentStep]}</CardContent>
    </Card>
  );
};
