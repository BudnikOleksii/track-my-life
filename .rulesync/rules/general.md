---
root: true
targets: ['*']
description: 'General coding rules that apply across the codebase'
globs: ['**/*']
---

Track My Life — a personal life tracking monorepo (pnpm workspaces + Turborepo).

## Tech Stack

- **Runtime**: Node 22.15.0, pnpm 10.10.0
- **Framework**: Next.js 16, React 19
- **Language**: TypeScript 5.9, SCSS for styles
- **i18n**: next-intl
- **Forms**: react-hook-form + zod
- **UI primitives**: Radix UI (via `@track-my-life/ui`)
- **Linting**: oxlint, stylelint, commitlint (conventional commits)
- **Formatting**: oxfmt
- **API client generation**: @hey-api/openapi-ts (in `packages/shared`)

## Monorepo Structure

```
apps/
  money-tracker/       # Next.js app — personal finance tracker
  storybook/           # Component playground
packages/
  ui/                  # Shared UI component library (@track-my-life/ui)
  shared/              # Shared constants, types, i18n, API client (@track-my-life/shared)
  lint-config/         # Shared oxlint config
  stylelint-config/    # Shared stylelint config
  typescript-config/   # Shared tsconfig
```

## Commands

| Command                | Description                 |
| ---------------------- | --------------------------- |
| `pnpm dev`             | Start all apps in dev mode  |
| `pnpm build`           | Build all apps and packages |
| `pnpm build:packages`  | Build packages only         |
| `pnpm build:storybook` | Build Storybook             |
| `pnpm test`            | Run tests                   |
| `pnpm test:e2e`        | Run end-to-end tests        |
| `pnpm type-check`      | TypeScript type checking    |
| `pnpm lint`            | Run oxlint                  |
| `pnpm lint:fix`        | Run oxlint with auto-fix    |
| `pnpm stylelint`       | Run stylelint               |
| `pnpm stylelint:fix`   | Run stylelint with auto-fix |
| `pnpm fmt`             | Format code with oxfmt      |
| `pnpm fmt:check`       | Check formatting            |

## General rules

- Always list applied rules for current query
- All package versions must be exact (no ^ or ~ prefixes)
- Do NOT leave comments
- Write self-documenting code with clear variable and function names
- Prefer composition over inheritance

## Architecture Principles

- Organize code by feature, not by file type
- Keep related files close together
- Use dependency injection for better testability
- Implement proper error handling
- Follow single responsibility principle

## Shared Code Placement

When code is duplicated across features, move it to the appropriate shared level:

### `packages/shared/src/constants/` — Cross-app reusable values

Domain constants, types, and utilities that any app could use:

- `list.ts` — generic list helpers (`NOT_FOUND_INDEX`, `EMPTY_LIST_LENGTH`)
- `transaction.ts` — domain constants (`TRANSACTION_TYPE`, `FilterValue`, `FILTER_OPTION_LIST`)
- `http-status-code.ts` — HTTP status codes

### `packages/ui/src/components/` — Cross-app reusable UI components

Components must be framework-agnostic (no `next-intl`, no app-specific imports). Pass labels, formatters, and callbacks via props so any app can use them.

### `apps/<app>/src/constants/` — App-wide shared values

Constants specific to one app but used across multiple features (e.g., `FILTER_TO_LABEL_KEY` with i18n keys, route paths).

### `apps/<app>/src/actions/` — App-wide shared server actions

Server actions used by multiple features (e.g., `fetch-category-list.ts` used by both categories and transactions).

### Decision guide

| Scope                             | Location                                                 |
| --------------------------------- | -------------------------------------------------------- |
| Used by multiple apps or packages | `packages/shared/src/`                                   |
| UI component, no app dependencies | `packages/ui/src/components/`                            |
| Used across features in one app   | `apps/<app>/src/constants/` or `apps/<app>/src/actions/` |
| Used by one feature only          | Keep in the feature directory                            |

## Skills

- Apply the `frontend-design` skill (`.claude/skills/frontend-design`) when building or designing app pages, components, layouts, or any UI work
- Apply the `vercel-react-best-practices` skill (`.claude/skills/vercel-react-best-practices`) when writing or refactoring React/Next.js code for performance
