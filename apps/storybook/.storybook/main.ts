import type { StorybookConfig } from '@storybook/react-vite';

import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const getAbsolutePath = (value: string): string =>
  dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  async viteFinal(config) {
    const fromStorybook = join(dirname(fileURLToPath(import.meta.url)), '..');
    const existingAlias =
      config.resolve?.alias && !Array.isArray(config.resolve.alias) ? config.resolve.alias : {};
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...existingAlias,
          '@track-my-life/ui': resolve(fromStorybook, '../../packages/ui'),
        },
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [...(config.optimizeDeps?.include ?? []), 'sonner', 'next-themes'],
      },
    };
  },
};
export default config;
