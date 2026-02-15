# @track-my-life/ui

Shared UI component library for the track-my-life monorepo. Built with SCSS modules and design tokens.

## Design system

This package includes a design system with Material Design 3 theme tokens generated from `resources/material-theme.json`.

### Design tokens

Tokens are available as CSS custom properties. Main categories:

- **Colors:** `--primary`, `--on-surface`, `--error`, etc. (see `src/styles/tokens/theme.scss` and `palette.scss`)
- **Breakpoints:** `--breakpoint-s`, `--breakpoint-m`, `--breakpoint-l`, `--breakpoint-xl`
- **Metrics:** `--radius-md`, `--spacing-2` … `--spacing-30`
- **Shadows:** `--shadows-0` … `--shadows-24`
- **Typography:** `--default-font-family`, `--font-body-m-size`, etc.

Light/dark themes are applied via `[data-theme="light"]` and `[data-theme="dark"]` (e.g. on `<html>`). Use `next-themes` or similar for switching.

### Regenerating theme files

After editing `resources/material-theme.json`, regenerate token files:

```bash
pnpm generate:theme
```

This updates `src/styles/tokens/palette.scss` and `src/styles/tokens/theme.scss`.

### Using the package in an app

1. Import the main styles entry once (e.g. in your root layout):

   ```ts
   import '@track-my-life/ui/styles';
   ```

2. Use components from the package:

   ```ts
   import { Button } from '@track-my-life/ui/components/button';
   import { Card, CardHeader, CardTitle } from '@track-my-life/ui/components/card';
   ```

3. Ensure the document has a theme attribute for tokens and Toaster:

   ```html
   <html data-theme="light"></html>
   ```

## Scripts

- `pnpm type-check` – TypeScript check
- `pnpm lint` / `pnpm lint:fix` – Oxlint
- `pnpm generate:theme` – Regenerate theme tokens from `resources/material-theme.json`
- `pnpm stylelint` / `pnpm stylelint:fix` – Stylelint for SCSS/CSS
