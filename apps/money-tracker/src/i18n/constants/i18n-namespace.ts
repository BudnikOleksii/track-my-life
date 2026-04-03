import type { ObjectValuesUnion } from '@track-my-life/shared/src/types/object-values-union';

export const I18N_NAMESPACE = {
  all: 'all',
  authShared: 'authShared',
  budgetsPage: 'budgetsPage',
  categoriesFormPage: 'categoriesFormPage',
  categoriesPage: 'categoriesPage',
  dashboardPage: 'dashboardPage',
  homePage: 'homePage',
  navigation: 'navigation',
  onboardingPage: 'onboardingPage',
  recurringTransactionsFormPage: 'recurringTransactionsFormPage',
  recurringTransactionsPage: 'recurringTransactionsPage',
  settingsPage: 'settingsPage',
  signInPage: 'signInPage',
  signUpPage: 'signUpPage',
  transactionsFormPage: 'transactionsFormPage',
  transactionsByCategoryPage: 'transactionsByCategoryPage',
  transactionsPage: 'transactionsPage',
  verifyEmailPage: 'verifyEmailPage',
} as const;

export type I18Namespace = ObjectValuesUnion<typeof I18N_NAMESPACE>;
