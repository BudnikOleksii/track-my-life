/* oxlint-disable */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// @ts-ignore
const __dirname = resolve(fileURLToPath(import.meta.url), '..');

interface MaterialTheme {
  palettes: Record<string, Record<string, string>>;
  schemes: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

const COLOR_MAPPING: Record<string, string> = {
  primary: 'purple',
  secondary: 'slate',
  tertiary: 'pink',
  error: 'red',
  neutral: 'gray',
  'neutral-variant': 'gray-variant',
};

const toKebabCase = (str: string): string =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const generatePaletteCSS = (palettes: MaterialTheme['palettes']): string => {
  let css = ':root {\n';

  Object.entries(palettes).forEach(([paletteName, colors]) => {
    const mappedName = COLOR_MAPPING[paletteName] || paletteName;

    Object.entries(colors).forEach(([shade, color]) => {
      css += `  --${mappedName}-${shade}: ${color};\n`;
    });
  });

  css += '}\n';

  return css;
};

const generateThemeCSS = (schemes: MaterialTheme['schemes']): string => {
  let css = '';

  ['light', 'dark'].forEach((themeName) => {
    const scheme = schemes[themeName as keyof typeof schemes];
    css += `[data-theme="${themeName}"] {\n`;

    Object.entries(scheme).forEach(([tokenName, color]) => {
      const kebabToken = toKebabCase(tokenName);
      css += `  --${kebabToken}: ${color};\n`;
    });

    css += '}\n\n';
  });

  return css.trim();
};

const generateTheme = () => {
  const themePath = resolve(__dirname, '../resources/material-theme.json');
  const outputDir = resolve(__dirname, '../src/styles/tokens');

  const themeData: MaterialTheme = JSON.parse(readFileSync(themePath, 'utf-8'));

  mkdirSync(outputDir, { recursive: true });

  const paletteCSS = generatePaletteCSS(themeData.palettes);
  writeFileSync(resolve(outputDir, 'palette.scss'), paletteCSS);
  console.log('✅ Generated palette.scss');

  const themeCSS = generateThemeCSS(themeData.schemes);
  writeFileSync(resolve(outputDir, 'theme.scss'), themeCSS);
  console.log('✅ Generated theme.scss');
};

generateTheme();
