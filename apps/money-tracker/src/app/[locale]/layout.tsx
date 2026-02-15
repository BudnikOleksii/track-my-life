// oxlint-disable new-cap
import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { NextIntlProvider } from '@track-my-life/shared/src/providers/NextIntlProvider';
import { Toaster } from '@track-my-life/ui/src/components/molecules/toaster/toaster';
import { getMessages, getNow, getTimeZone, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
// oxlint-disable-next-line import/no-unassigned-import
import '@track-my-life/ui/src/styles/index.scss';
// oxlint-disable-next-line import/no-unassigned-import
import '../globals.css';
import { Outfit, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--default-font-family',
  weight: ['400', '500', '600', '700', '800'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--accent-font-family',
});

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

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={`${poppins.variable} ${outfit.variable}`}>
        <NextIntlProvider locale={params.locale} messages={messages} timeZone={timeZone} now={now}>
          <ThemeProvider>
            {children}

            <Toaster />
          </ThemeProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
};

export default RootLayout;
