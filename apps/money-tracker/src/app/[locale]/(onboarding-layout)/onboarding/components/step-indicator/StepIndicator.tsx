'use client';

import type { FC } from 'react';

import { cn } from '@track-my-life/ui/src/lib/utils';
import { useTranslations } from 'next-intl';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { OnboardingStep } from '../../constants/onboarding-step';

import { ONBOARDING_STEP, ONBOARDING_STEP_LIST } from '../../constants/onboarding-step';
import styles from './StepIndicator.module.scss';

interface StepIndicatorProps {
  currentStep: OnboardingStep;
}

const STEP_LABEL_MAP: Record<OnboardingStep, string> = {
  [ONBOARDING_STEP.welcome]: 'content.stepWelcome',
  [ONBOARDING_STEP.profile]: 'content.stepProfile',
  [ONBOARDING_STEP.complete]: 'content.stepComplete',
};

export const StepIndicator: FC<StepIndicatorProps> = ({ currentStep }) => {
  const translations = useTranslations(I18N_NAMESPACE.onboardingPage);
  const currentIndex = ONBOARDING_STEP_LIST.indexOf(currentStep);

  return (
    <div className={styles.container}>
      {ONBOARDING_STEP_LIST.map((step, index) => {
        const labelKey = STEP_LABEL_MAP[step] ?? '';
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <div
            key={step}
            className={cn(styles.step, isActive && styles.active, isCompleted && styles.completed)}
          >
            <div className={styles.dot} />
            <span className={styles.label}>{translations(labelKey)}</span>
          </div>
        );
      })}
    </div>
  );
};
