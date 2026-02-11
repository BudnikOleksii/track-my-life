import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	transpilePackages: ['@track-my-life/ui'],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
