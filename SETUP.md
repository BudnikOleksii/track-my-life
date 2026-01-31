# Setup Guide

## Initial Setup

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Initialize Husky (if not already done):**

   ```bash
   pnpm prepare
   ```

3. **Setup ShadCN UI in your Next.js app:**

   ```bash
   cd apps/money-tracker
   npx shadcn@latest init
   ```

   When prompted, configure:
   - Style: default
   - Base color: slate
   - CSS variables: yes
   - Components: @/components
   - Utils: @track-my-life/ui/lib/utils

## Adding ShadCN Components

To add ShadCN components to your app:

```bash
cd apps/money-tracker
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

Components will be added to `apps/money-tracker/src/components/ui/` and can be imported from there.

## Development Workflow

1. **Start development:**

   ```bash
   pnpm dev
   ```

2. **Run linting:**

   ```bash
   pnpm lint
   pnpm lint:fix
   ```

3. **Format code:**

   ```bash
   pnpm format:write
   ```

4. **Type check:**
   ```bash
   pnpm type-check
   ```

## Project Structure

- `apps/money-tracker` - Main Next.js application
- `apps/storybook` - Storybook for component documentation
- `packages/ui` - ShadCN UI component library
- `packages/lint-config` - Shared Oxlint configurations
- `packages/typescript-config` - Shared TypeScript configurations

## Key Differences from ESLint/Prettier Setup

1. **Oxlint** replaces ESLint - faster, Rust-based linter
2. **Oxfmt** replaces Prettier - faster, Prettier-compatible formatter
3. **No stylelint** - Removed from UI package (using Tailwind CSS instead)
4. **ShadCN UI** - Component library using Tailwind CSS instead of SCSS modules

## Troubleshooting

### Oxlint config not found

Make sure you have `oxlint` installed in the root `node_modules`. The schema path in config files should point to `./node_modules/oxlint/configuration_schema.json` or `../../node_modules/oxlint/configuration_schema.json` depending on location.

### ShadCN components not found

Make sure you've initialized ShadCN in your app and that the `components.json` is properly configured to point to the UI package utils.
