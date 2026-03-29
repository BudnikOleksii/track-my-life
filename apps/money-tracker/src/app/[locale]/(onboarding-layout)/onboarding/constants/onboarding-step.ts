import type { ObjectValuesUnion } from '@track-my-life/shared/src/types/object-values-union';

export const ONBOARDING_STEP = {
  welcome: 'welcome',
  profile: 'profile',
  complete: 'complete',
} as const;

export const ONBOARDING_STEP_LIST = Object.values(ONBOARDING_STEP) as const;

export type OnboardingStep = ObjectValuesUnion<typeof ONBOARDING_STEP>;

export const checkIsOnboardingStep = (value: string): value is OnboardingStep =>
  ONBOARDING_STEP_LIST.includes(value as OnboardingStep);
