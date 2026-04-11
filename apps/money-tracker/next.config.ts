import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';
import path from 'node:path';

const securityHeaderList = [
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
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
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
