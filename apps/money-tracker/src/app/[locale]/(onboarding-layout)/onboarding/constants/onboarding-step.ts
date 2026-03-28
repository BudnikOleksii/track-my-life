export const ONBOARDING_STEP = {
  welcome: 'welcome',
  profile: 'profile',
  complete: 'complete',
} as const;

export const ONBOARDING_STEP_LIST = [
  ONBOARDING_STEP.welcome,
  ONBOARDING_STEP.profile,
  ONBOARDING_STEP.complete,
] as const;
