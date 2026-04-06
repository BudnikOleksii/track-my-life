## Why

The codebase has three type safety gaps that allow runtime/compile-time mismatches: (1) string literal unions exist separately from their Zod validation schemas, meaning a new enum value added to a type but missed in validation silently passes; (2) all 9 API service methods cast typed query objects to `Record<string, unknown>`, discarding compile-time guarantees at the network boundary; (3) `exactOptionalPropertyTypes` is disabled, allowing `undefined` to be assigned to optional properties — hiding bugs where "missing" and "explicitly undefined" should be distinguished.

## What Changes

- **Zod enums as single source of truth**: Define `TRANSACTION_TYPE` and filter values using `z.enum()`, then derive both the runtime constant object and the TypeScript type from Zod. Form schemas already use `z.enum` — this unifies the source so adding/removing a value is a single change.
- **Type-safe API query passing**: Replace `query as Record<string, unknown>` casts in all API service methods by making `RequestOptions.query` generic or accepting the typed query objects directly. Also replace `as Record<string, unknown>` casts in data validation functions with proper type narrowing.
- **Enable `exactOptionalPropertyTypes`**: Add the compiler flag to `packages/typescript-config/base.json` and fix all resulting errors (30+ instances of `prop: condition ? value : undefined` patterns need refactoring to conditional spreading or property omission).

## Capabilities

### New Capabilities

- `zod-enum-types`: Centralized Zod enum definitions as the single source of truth for domain union types (TransactionType, FilterValue), replacing disconnected string literal unions
- `typed-api-query`: Type-safe query parameter passing in API service layer, eliminating all `as Record<string, unknown>` casts
- `exact-optional-properties`: Strict optional property typing across the entire monorepo via `exactOptionalPropertyTypes` compiler flag

### Modified Capabilities

_(none — these are internal type-system improvements with no spec-level behavior changes)_

## Impact

- **packages/shared/src/constants/**: `TRANSACTION_TYPE` and `FilterValue` definitions change to Zod-derived types
- **packages/shared/src/api/client/types.ts**: `RequestOptions.query` type signature becomes generic
- **packages/shared/src/api/services/**: All 5 service files lose their `as Record<string, unknown>` casts (9 call sites)
- **apps/money-tracker/src/**: ~8 data validation functions refactored to proper type narrowing; 30+ conditional undefined assignments refactored
- **packages/typescript-config/base.json**: New compiler option added — affects all packages and apps
- **Form schemas**: Already use `z.enum` — will import from shared Zod definitions instead of raw constants
