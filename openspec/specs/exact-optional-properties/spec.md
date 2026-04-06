## ADDED Requirements

### Requirement: Enable exactOptionalPropertyTypes compiler option

The `packages/typescript-config/base.json` SHALL include `"exactOptionalPropertyTypes": true` in `compilerOptions`. This applies to all packages and apps that extend the base config.

#### Scenario: Compiler rejects undefined assignment to optional property

- **WHEN** code assigns `undefined` to an optional property (e.g., `{ prop: undefined }` where `prop` is declared as `prop?: string`)
- **THEN** the TypeScript compiler SHALL report a type error

#### Scenario: Compiler accepts omitted optional property

- **WHEN** code omits an optional property entirely (e.g., `{}` where `prop?: string` is expected)
- **THEN** the TypeScript compiler SHALL not report an error

### Requirement: Replace conditional undefined patterns with conditional spreading

All patterns of `prop: condition ? value : undefined` on optional properties SHALL be refactored to use conditional spreading: `...(condition && { prop: value })`.

#### Scenario: Object literal with conditional property

- **WHEN** an object is constructed with a conditionally present property
- **THEN** it SHALL use `...(condition && { prop: value })` instead of ternary with `undefined`

#### Scenario: JSX attributes that accept undefined

- **WHEN** a JSX attribute's type explicitly includes `undefined` in its union (e.g., `aria-current?: 'page' | undefined`)
- **THEN** the ternary pattern `condition ? value : undefined` MAY be kept as-is since the attribute type allows `undefined`

### Requirement: All packages pass type-check after enabling the flag

After enabling `exactOptionalPropertyTypes`, running `pnpm type-check` SHALL produce zero errors across all packages and apps.

#### Scenario: Clean type-check

- **WHEN** `pnpm type-check` is executed
- **THEN** it SHALL exit with code 0 and produce no type errors
