import type { LocaleCode } from '@track-my-life/shared/src/i18n/constants/locale-code';
import type { LocalizationMessages } from '@track-my-life/shared/src/i18n/types/localization-messages';

import { LOCALE_CODE } from '@track-my-life/shared/src/i18n/constants/locale-code';
import { withCache } from '@track-my-life/shared/src/utils/with-cache';
import deepmerge from 'deepmerge';

import { LOCALIZATION_MESSAGES_FILE_NAME_BY_NAMESPACE } from '../constants/localization-messages-file-name-by-namespace';

const DEFAULT_LOCALE_CODE = LOCALE_CODE.EN;

const importMessagesJson = async (locale: LocaleCode, fileName: string): Promise<unknown> => {
	const messagesModule = await import(`../../../messages/${locale}/${fileName}.json`);

	return messagesModule.default;
};

const getMessagesByLocaleInternal = async (
	locale: LocaleCode,
	fileByNamespace: Record<string, string>,
): Promise<LocalizationMessages> => {
	const messages: LocalizationMessages = {};
	const namespaceEntries = Object.entries(fileByNamespace);

	const loadMessageList = namespaceEntries.map(async ([namespace, fileName]) => {
		if (!fileName) {
			return;
		}

		try {
			const localizedMessages = await importMessagesJson(locale, fileName);

			messages[namespace] = localizedMessages;
		} catch {
			const defaultMessages = await importMessagesJson(DEFAULT_LOCALE_CODE, fileName);

			messages[namespace] = defaultMessages;
		}
	});

	await Promise.all(loadMessageList);

	return messages;
};

const getBundledMessagesByLocale = async (locale: LocaleCode): Promise<LocalizationMessages> => {
	const currentLocaleMessages = await getMessagesByLocaleInternal(
		locale,
		LOCALIZATION_MESSAGES_FILE_NAME_BY_NAMESPACE,
	);

	const defaultLocaleMessages = await getMessagesByLocaleInternal(
		DEFAULT_LOCALE_CODE,
		LOCALIZATION_MESSAGES_FILE_NAME_BY_NAMESPACE,
	);

	return deepmerge(defaultLocaleMessages, currentLocaleMessages) as LocalizationMessages;
};

export const getMessagesByLocale = withCache(getBundledMessagesByLocale);
