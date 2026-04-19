'use client';

import type { CurrencyCode } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC, ReactNode } from 'react';

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

import { CategoriesStep } from './components/categories-step/CategoriesStep';
import { CurrencyStep } from './components/currency-step/CurrencyStep';
import { PasswordStep } from './components/password-step/PasswordStep';
import { StepIndicator } from './components/step-indicator/StepIndicator';
import { ONBOARDING_STEP } from './constants/onboarding-step';
import styles from './page.module.scss';

interface OnboardingPageContentProps {
  currentStep: OnboardingStep;
  currency?: CurrencyCode | undefined;
  hasPassword: boolean;
}

const STEP_TITLE_MAP: Record<OnboardingStep, string> = {
  [ONBOARDING_STEP.currency]: 'content.currencyTitle',
  [ONBOARDING_STEP.categories]: 'content.categoriesTitle',
  [ONBOARDING_STEP.password]: 'content.passwordTitle',
};

const STEP_DESCRIPTION_MAP: Record<OnboardingStep, string> = {
  [ONBOARDING_STEP.currency]: 'content.currencyDescription',
  [ONBOARDING_STEP.categories]: 'content.categoriesDescription',
  [ONBOARDING_STEP.password]: 'content.passwordDescription',
};

export const OnboardingPageContent: FC<OnboardingPageContentProps> = ({
  currentStep,
  currency,
  hasPassword,
}) => {
  const translations = useTranslations(I18N_NAMESPACE.onboardingPage);

  const stepContentMap: Record<OnboardingStep, ReactNode> = {
    [ONBOARDING_STEP.currency]: <CurrencyStep defaultCurrency={currency} />,
    [ONBOARDING_STEP.categories]: currency ? (
      <CategoriesStep currency={currency} hasPassword={hasPassword} />
    ) : null,
    [ONBOARDING_STEP.password]: currency ? <PasswordStep currency={currency} /> : null,
  };

  const titleKey = STEP_TITLE_MAP[currentStep];
  const descriptionKey = STEP_DESCRIPTION_MAP[currentStep];

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <StepIndicator currentStep={currentStep} hasPassword={hasPassword} />
        <CardTitle>{translations(titleKey)}</CardTitle>
        <CardDescription>{translations(descriptionKey)}</CardDescription>
      </CardHeader>

      <CardContent className={styles.cardContent}>{stepContentMap[currentStep]}</CardContent>
    </Card>
  );
};
