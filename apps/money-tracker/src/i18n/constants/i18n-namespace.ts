import type { ObjectKeysUnion } from '@track-my-life/shared/src/types/object-key-union';

export const I18N_NAMESPACE = {
  all: 'all',
  authShared: 'authShared',
  categoriesPage: 'categoriesPage',
  dashboardPage: 'dashboardPage',
  homePage: 'homePage',
  signInPage: 'signInPage',
  signUpPage: 'signUpPage',
} as const;

export type I18Namespace = ObjectKeysUnion<typeof I18N_NAMESPACE>;
