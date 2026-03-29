import type { Metadata } from 'next';
import type { FC } from 'react';

import { getTranslations } from 'next-intl/server';

import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { OnboardingStep } from './constants/onboarding-step';

import { checkIsOnboardingStep, ONBOARDING_STEP } from './constants/onboarding-step';
import { OnboardingPageContent } from './page.content';

interface Props {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    step?: string;
  }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  const translations = await getTranslations({
    locale: params.locale,
    namespace: I18N_NAMESPACE.onboardingPage,
  });

  return {
    description: translations('metadata.description'),
    title: translations('metadata.title'),
  };
};

const parseOnboardingStep = (step?: string): OnboardingStep => {
  if (step && checkIsOnboardingStep(step)) {
    return step;
  }

  return ONBOARDING_STEP.welcome;
};

const OnboardingPage: FC<Props> = async (props) => {
  const searchParams = await props.searchParams;
  const currentStep = parseOnboardingStep(searchParams.step);

  return <OnboardingPageContent currentStep={currentStep} />;
};

export default OnboardingPage;
