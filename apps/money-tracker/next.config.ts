import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';
import path from 'node:path';

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
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
