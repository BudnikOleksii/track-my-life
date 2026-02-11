import type { I18Namespace } from './i18n-namespace';

import { I18N_NAMESPACE } from './i18n-namespace';

export const LOCALIZATION_MESSAGES_FILE_NAME_BY_NAMESPACE: Record<I18Namespace, string> = {
	[I18N_NAMESPACE.all]: 'all',
	[I18N_NAMESPACE.homePage]: 'home-page',
	[I18N_NAMESPACE.signInPage]: 'sign-in-page',
	[I18N_NAMESPACE.signUpPage]: 'sign-up-page',
	[I18N_NAMESPACE.dashboardPage]: 'dashboard-page',
	[I18N_NAMESPACE.authShared]: 'auth-shared',
	[I18N_NAMESPACE.categoriesPage]: 'categories-page',
};
