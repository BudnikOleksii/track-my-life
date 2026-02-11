// oxlint-disable new-cap
import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { NextIntlProvider } from '@track-my-life/shared/src/providers/NextIntlProvider';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Poppins, Outfit } from 'next/font/google';

// oxlint-disable-next-line import/no-unassigned-import
import '../globals.css';

const poppins = Poppins({
  variable: '--default-font-family',
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--accent-font-family',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s - Money Tracker',
    default: 'Money Tracker Online - Easily manage your expenses and incomes',
  },
  description: 'Application for tracking life events',
};

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

const RootLayout: FC<Props> = async (props) => {
  const params = await props.params;
  const { children } = props;

  setRequestLocale(params.locale);

  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body className={`${poppins.variable} ${outfit.variable} antialiased`}>
        <NextIntlProvider locale={params.locale} messages={messages}>
          {children}
        </NextIntlProvider>
      </body>
    </html>
  );
};

export default RootLayout;
