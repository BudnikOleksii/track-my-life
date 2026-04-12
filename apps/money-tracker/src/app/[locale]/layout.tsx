// oxlint-disable new-cap
import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { NextIntlProvider } from '@track-my-life/next-shared/src/providers/NextIntlProvider';
import { LOCALE_CODE_LIST } from '@track-my-life/shared/src/i18n/constants/locale-code';
import { Toaster } from '@track-my-life/ui/src/components/molecules/toaster/toaster';
import { cn } from '@track-my-life/ui/src/lib/utils';
import { getMessages, getNow, getTimeZone, setRequestLocale } from 'next-intl/server';
// oxlint-disable-next-line import/no-unassigned-import
import '@track-my-life/ui/src/styles/index.scss';
// oxlint-disable-next-line import/no-unassigned-import
import '../globals.css';
import { ThemeProvider } from 'next-themes';
import { Outfit, Poppins } from 'next/font/google';
import { headers } from 'next/headers';

import { TimezoneOffsetSetter } from './components/timezone-offset-setter/TimezoneOffsetSetter';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--default-font-family',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--accent-font-family',
  display: 'swap',
});

export const generateStaticParams = () => LOCALE_CODE_LIST.map((locale) => ({ locale }));

export const metadata: Metadata = {
  description: 'Easily manage your expenses and incomes with Money Tracker Online',
  title: {
    default: 'Money Tracker Online - Easily manage your expenses and incomes',
    template: '%s - Money Tracker',
  },
};

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

const RootLayout: FC<Props> = async (props) => {
  const params = await props.params;
  const { children } = props;

  setRequestLocale(params.locale);

  const messages = await getMessages();
  const timeZone = await getTimeZone();
  const now = await getNow();
  const headerList = await headers();
  const nonce = headerList.get('x-nonce') ?? '';

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={cn(poppins.variable, outfit.variable)}>
        <NextIntlProvider locale={params.locale} messages={messages} timeZone={timeZone} now={now}>
          <ThemeProvider attribute="data-theme" nonce={nonce}>
            <TimezoneOffsetSetter />
            {children}

            <Toaster />
          </ThemeProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
};

export default RootLayout;
