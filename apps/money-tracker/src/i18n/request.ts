import { checkIsLocaleCode } from '@track-my-life/shared/src/i18n/constants/locale-code';
import { getTranslationMessageFallback } from '@track-my-life/shared/src/i18n/utils/get-translation-message-fallback';
import { onTranslateError } from '@track-my-life/shared/src/i18n/utils/on-translate-error';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { getMessagesByLocale } from '@/i18n/utils/get-messages-by-locale';

export default getRequestConfig(async ({ requestLocale }) => {
	const locale = await requestLocale;

	if (!locale || !checkIsLocaleCode(locale)) {
		return notFound();
	}

	return {
		getMessageFallback: getTranslationMessageFallback,
		locale,
		messages: await getMessagesByLocale(locale),
		onError: onTranslateError,
	};
});
