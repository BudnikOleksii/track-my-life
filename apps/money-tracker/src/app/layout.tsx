// oxlint-disable-next-line import/no-unassigned-import
import './globals.css';
import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

const metadata: Metadata = {
  description: 'Application for tracking life events',
  title: 'Track My Life',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export { metadata };

export default RootLayout;
