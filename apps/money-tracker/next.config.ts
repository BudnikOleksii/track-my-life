import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';
import path from 'node:path';

const IS_DEV = process.env.NODE_ENV === 'development';

const securityHeaderList = [
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; script-src 'self' 'unsafe-inline'${IS_DEV ? " 'unsafe-eval'" : ''}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'`,
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    // oxlint-disable-next-line no-undef
    loadPaths: [path.resolve(__dirname, 'node_modules')],
    additionalData: `
      @use '@track-my-life/ui/src/styles/breakpoints' as *;
      @use '@track-my-life/ui/src/styles/mixins' as *;
    `,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaderList,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
