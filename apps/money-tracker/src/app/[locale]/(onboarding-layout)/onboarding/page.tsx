import type { Metadata } from 'next';
import type { FC } from 'react';

import { redirect } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { getTranslations } from 'next-intl/server';

import { PATHS } from '@/constants/paths';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import type { OnboardingStep } from './constants/onboarding-step';

import { fetchOnboardingStatus } from './actions/fetch-onboarding-status';
import { checkIsOnboardingStep, ONBOARDING_STEP } from './constants/onboarding-step';
import { OnboardingPageContent } from './page.content';

interface Props {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    step?: string;
    currency?: string;
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

  return ONBOARDING_STEP.currency;
};

const OnboardingPage: FC<Props> = async (props) => {
  const [searchParams, params] = await Promise.all([props.searchParams, props.params]);
  const currentStep = parseOnboardingStep(searchParams.step);
  const { currency } = searchParams;

  if (currentStep !== ONBOARDING_STEP.currency && !currency) {
    redirect({
      href: `${PATHS.onboarding}?step=${ONBOARDING_STEP.currency}`,
      locale: params.locale,
    });
  }

  const status = await fetchOnboardingStatus();
  const hasPassword = status?.hasPassword ?? true;

  return (
    <OnboardingPageContent
      currentStep={currentStep}
      currency={currency}
      hasPassword={hasPassword}
    />
  );
};

export default OnboardingPage;
