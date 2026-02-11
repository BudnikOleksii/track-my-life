'use client';

import type { ComponentProps, FC } from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { getTranslationMessageFallback } from '../i18n/utils/get-translation-message-fallback';
import { onTranslateError } from '../i18n/utils/on-translate-error';

export const NextIntlProvider: FC<ComponentProps<typeof NextIntlClientProvider>> = ({
  children,
  locale,
  messages,
  ...props
}) => (
  <NextIntlClientProvider
    getMessageFallback={getTranslationMessageFallback}
    locale={locale}
    messages={messages}
    onError={onTranslateError}
    {...props}
  >
    {children}
  </NextIntlClientProvider>
);
