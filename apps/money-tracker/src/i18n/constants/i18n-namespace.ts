import type { ObjectValuesUnion } from '@track-my-life/shared/src/types/object-values-union';

export const I18N_NAMESPACE = {
  all: 'all',
  authShared: 'authShared',
  categoriesPage: 'categoriesPage',
  dashboardPage: 'dashboardPage',
  homePage: 'homePage',
  signInPage: 'signInPage',
  signUpPage: 'signUpPage',
} as const;

export type I18Namespace = ObjectValuesUnion<typeof I18N_NAMESPACE>;
