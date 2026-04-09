'use client';

import type { FC } from 'react';

import { cn } from '@track-my-life/ui/src/lib/utils';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { OnboardingStep } from '../../constants/onboarding-step';

import { ONBOARDING_STEP } from '../../constants/onboarding-step';
import styles from './StepIndicator.module.scss';

interface StepIndicatorProps {
  currentStep: OnboardingStep;
  hasPassword: boolean;
}

const STEP_LABEL_MAP: Record<OnboardingStep, string> = {
  [ONBOARDING_STEP.currency]: 'content.stepCurrency',
  [ONBOARDING_STEP.categories]: 'content.stepCategories',
  [ONBOARDING_STEP.password]: 'content.stepPassword',
};

export const StepIndicator: FC<StepIndicatorProps> = ({ currentStep, hasPassword }) => {
  const translations = useTranslations(I18N_NAMESPACE.onboardingPage);

  const visibleStepList = useMemo(() => {
    const stepList: OnboardingStep[] = [ONBOARDING_STEP.currency, ONBOARDING_STEP.categories];
    if (!hasPassword) {
      stepList.push(ONBOARDING_STEP.password);
    }
    return stepList;
  }, [hasPassword]);

  const currentIndex = visibleStepList.indexOf(currentStep);

  return (
    <div className={styles.container}>
      {visibleStepList.map((step, index) => {
        const labelKey = STEP_LABEL_MAP[step];
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
