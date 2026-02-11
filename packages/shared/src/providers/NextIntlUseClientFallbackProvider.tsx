'use client';

import type { FC, PropsWithChildren } from 'react';

import { NextIntlClientProvider, useLocale, useMessages, useNow, useTimeZone } from 'next-intl';

import { getTranslationMessageFallback } from '../i18n/utils/get-translation-message-fallback';
import { onTranslateError } from '../i18n/utils/on-translate-error';

export const NextIntlUseClientFallbackProvider: FC<PropsWithChildren> = ({ children }) => {
	const locale = useLocale();
	const timeZone = useTimeZone();
	const now = useNow();
	const messages = useMessages();

	return (
		<NextIntlClientProvider
			getMessageFallback={getTranslationMessageFallback}
			locale={locale}
			messages={messages}
			now={now}
			timeZone={timeZone}
			onError={onTranslateError}
		>
			{children}
		</NextIntlClientProvider>
	);
};
