import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { LOCALE_CODE, LOCALE_CODE_LIST } from './constants/locale-code';

export const routing = defineRouting({
  alternateLinks: false,
  defaultLocale: LOCALE_CODE.EN,
  localeDetection: false,
  localePrefix: 'as-needed',
  locales: LOCALE_CODE_LIST,
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
