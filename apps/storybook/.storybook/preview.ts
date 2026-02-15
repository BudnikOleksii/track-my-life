import type { Preview, StoryObj } from '@storybook/react-vite';
import type { StoryContext } from 'storybook/internal/csf';

import { withThemeByDataAttribute, DecoratorHelpers } from '@storybook/addon-themes';
import { ThemeProvider } from 'next-themes';
// oxlint-disable-next-line import/no-unassigned-import
import '@track-my-life/ui/src/styles/index.scss';
import React from 'react';

const { pluckThemeFromContext } = DecoratorHelpers;

const withDataTheme = withThemeByDataAttribute({
  themes: {
    light: 'light',
    dark: 'dark',
  },
  defaultTheme: 'light',
  attributeName: 'data-theme',
});

const withNextThemes: Preview['decorators'] = [
  (Story: StoryObj, context: StoryContext) => {
    const theme = pluckThemeFromContext(context) || 'light';
    return React.createElement(
      ThemeProvider,
      {
        attribute: 'data-theme',
        defaultTheme: 'light',
        forcedTheme: theme,
        enableSystem: false,
      },
      React.createElement(Story),
    );
  },
];

const preview: Preview = {
  decorators: [withDataTheme, ...withNextThemes],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
