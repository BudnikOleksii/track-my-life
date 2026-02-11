import type { ObjectKeysUnion } from '../../types/object-key-union';

export const LOCALE_CODE = {
  EN: 'en',
  UK: 'uk',
} as const;

export type LocaleCode = ObjectKeysUnion<typeof LOCALE_CODE>;

export const LOCALE_CODE_LIST = Object.values(LOCALE_CODE);

export const checkIsLocaleCode = (locale: string): locale is LocaleCode =>
  LOCALE_CODE_LIST.includes(locale as LocaleCode);
