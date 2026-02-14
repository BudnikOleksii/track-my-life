// oxlint-disable new-cap
import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { NextIntlProvider } from '@track-my-life/shared/src/providers/NextIntlProvider';
import { getMessages, getNow, getTimeZone, setRequestLocale } from 'next-intl/server';
import { Outfit, Poppins } from 'next/font/google';

// oxlint-disable-next-line import/no-unassigned-import
import '../globals.css';

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
  description: 'Application for tracking life events',
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
    <html lang={params.locale}>
      <body className={`${poppins.variable} ${outfit.variable} antialiased`}>
        <NextIntlProvider locale={params.locale} messages={messages} timeZone={timeZone} now={now}>
          {children}
        </NextIntlProvider>
      </body>
    </html>
  );
};

export default RootLayout;
