# Track My Life

A Turborepo monorepo for tracking life events, built with Next.js, ShadCN UI, Oxlint, and Oxfmt.

## Structure

```
/
├── apps/
│   ├── money-tracker/          # Next.js application
│   └── storybook/        # Storybook for UI components
├── packages/
│   ├── ui/               # ShadCN UI component library
│   ├── lint-config/      # Shared Oxlint configurations
│   └── typescript-config/ # Shared TypeScript configurations
```

## Tech Stack

- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Framework**: Next.js 16+
- **UI Library**: ShadCN UI
- **Linting**: Oxlint (replaces ESLint)
- **Formatting**: Oxfmt (replaces Prettier)
- **Type Checking**: TypeScript
- **Component Documentation**: Storybook

## Getting Started

### Prerequisites

- Node.js 22.15.0
- pnpm 10.10.0

### Installation

```bash
pnpm install
```

### Development

Run all apps in development mode:

```bash
pnpm dev
```

Run a specific app:

```bash
pnpm --filter money-tracker dev
pnpm --filter storybook storybook
```

### Building

Build all packages and apps:

```bash
pnpm build
```

Build specific packages:

```bash
pnpm build:packages
pnpm build:storybook
```

### Linting and Formatting

Lint all packages:

```bash
pnpm lint
pnpm lint:fix
```

Format all files:

```bash
pnpm format
pnpm format:write
```

### Type Checking

Type check all packages:

```bash
pnpm type-check
```

## Packages

### @track-my-life/ui

Shared UI component library using ShadCN UI. To add new components:

```bash
cd apps/money-tracker
npx shadcn@latest add [component-name]
```

### @track-my-life/lint-config

Shared Oxlint configurations:

- `base` - Base configuration for all projects
- `library` - For Node.js libraries
- `next-js` - For Next.js applications
- `react-internal` - For React component libraries

### @track-my-life/typescript-config

Shared TypeScript configurations:

- `base.json` - Base TypeScript config
- `nextjs.json` - For Next.js apps
- `react-library.json` - For React libraries

## Git Hooks

This project uses Husky for git hooks:

- **pre-commit**: Runs lint-staged (oxfmt + oxlint)
- **pre-push**: Runs type-check and tests
- **commit-msg**: Validates commit messages with commitlint

## Scripts

- `pnpm dev` - Start all apps in development
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all packages
- `pnpm lint:fix` - Fix linting issues
- `pnpm format` - Check formatting
- `pnpm format:write` - Format all files
- `pnpm type-check` - Type check all packages
- `pnpm test` - Run tests
- `pnpm build:storybook` - Build Storybook

## License

UNLICENSED
