import type { ObjectValuesUnion } from '@track-my-life/shared/src/types/object-values-union';

export const I18N_NAMESPACE = {
  all: 'all',
  authShared: 'authShared',
  budgetsPage: 'budgetsPage',
  categoriesPage: 'categoriesPage',
  dashboardPage: 'dashboardPage',
  homePage: 'homePage',
  navigation: 'navigation',
  settingsPage: 'settingsPage',
  signInPage: 'signInPage',
  signUpPage: 'signUpPage',
  transactionsPage: 'transactionsPage',
  verifyEmailPage: 'verifyEmailPage',
} as const;

export type I18Namespace = ObjectValuesUnion<typeof I18N_NAMESPACE>;
