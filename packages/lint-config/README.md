# `@track-my-life/lint-config`

Collection of shared Oxlint configurations for the track-my-life monorepo.

## Available Configurations

| Config  | Export                                      | Description                      |
| ------- | ------------------------------------------- | -------------------------------- |
| Base    | `@track-my-life/lint-config/base`           | Base TypeScript/JavaScript rules |
| Next.js | `@track-my-life/lint-config/next-js`        | Next.js with React rules         |
| Library | `@track-my-life/lint-config/library`        | Node.js library rules            |
| React   | `@track-my-life/lint-config/react-internal` | Internal React packages          |

## Usage

### 1. Install dependencies

```bash
pnpm add -D oxlint
```

### 2. Create `.oxlintrc.json` in your package

For a Next.js app:

```json
{
  "$schema": "https://raw.githubusercontent.com/oxc-project/oxc/main/npm/oxlint/configuration_schema.json",
  "extends": ["@track-my-life/lint-config/next-js"]
}
```

For a library:

```json
{
  "$schema": "https://raw.githubusercontent.com/oxc-project/oxc/main/npm/oxlint/configuration_schema.json",
  "extends": ["@track-my-life/lint-config/library"]
}
```

### 3. Add scripts to `package.json`

```json
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix"
  }
}
```

## Migrating from ESLint

If you need the old ESLint-based configuration, use `@track-my-life/lint-config-deprecated`.

### Why Oxlint?

- **Performance**: 50-100x faster than ESLint
- **Zero config**: Works out of the box with sensible defaults
- **Native plugins**: TypeScript, React, Next.js, and import rules built-in
- **Drop-in replacement**: Compatible rule naming conventions

## Configuration Details

### Base Config (`configs/base.json`)

Includes:

- TypeScript strict rules
- Import ordering and validation
- No console (except warn/error)
- Prefer const, no var
- Consistent code style

### Next.js Config (`configs/next.json`)

Extends base with:

- React rules (hooks, JSX)
- Next.js specific rules (no img element, link handling)
- Service worker globals

### Library Config (`configs/library.json`)

Extends base with:

- Explicit return types
- Module boundary types
- Stricter export rules

### React Config (`configs/react.json`)

Extends base with:

- React rules
- Hooks rules (rules-of-hooks, exhaustive-deps)
- JSX validation
