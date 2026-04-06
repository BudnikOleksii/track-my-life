## Context

The money-tracker app uses generated OpenAPI types (`types.gen.ts`) for domain unions like `TransactionType` and `Granularity`. These are string literal unions with no runtime validation layer. The app manually mirrors them in `apps/money-tracker/src/constants/transaction.ts` as `as const` objects. Zod form schemas reference the constant values but are defined separately — there is no single source of truth.

API service methods in `packages/shared/src/api/services/` pass typed query objects to `ApiClient.request()`, but `RequestOptions.query` only accepts `Record<string, unknown>`, forcing 9 unsafe casts. Data validation functions in server actions also cast response objects to `Record<string, unknown>` for property access.

`exactOptionalPropertyTypes` is not enabled. The codebase has 30+ patterns of `prop: condition ? value : undefined` which would violate the stricter check.

## Goals / Non-Goals

**Goals:**

- Single source of truth for domain union types using Zod enums, with TypeScript types and runtime constants derived from them
- Zero `as Record<string, unknown>` casts in API service layer and data validation functions
- Enable `exactOptionalPropertyTypes` in `base.json` with all type errors resolved

**Non-Goals:**

- Changing the OpenAPI-generated `types.gen.ts` file (it's auto-generated)
- Adding runtime validation to API responses (out of scope — just fixing the query parameter typing)
- Refactoring the `ApiClient` class beyond the `query` type change

## Decisions

### 1. Zod enum as source, `as const` object derived from it

**Decision**: Define a Zod enum schema (e.g., `transactionTypeSchema = z.enum(['INCOME', 'EXPENSE'])`), then derive both the type (`z.infer<typeof transactionTypeSchema>`) and the runtime constant object from `transactionTypeSchema.enum`.

**Rationale**: The project rule says "Do not use enums, use objects with `as const`". Zod's `.enum` property returns an object like `{ INCOME: 'INCOME', EXPENSE: 'EXPENSE' }` which satisfies this pattern. The Zod schema becomes the single source, and form schemas import the schema directly instead of referencing separate constants.

**Alternative considered**: Keep `as const` objects as source and build Zod schemas from them via `z.nativeEnum()`. Rejected because Zod enum is more ergonomic and the form schemas already use `z.enum()` — this aligns the direction.

### 2. Generic `query` type on `RequestOptions`

**Decision**: Change `RequestOptions.query` from `Record<string, unknown>` to a generic parameter `TQuery extends Record<string, unknown> = Record<string, unknown>`. Update `ApiClient.request<TData, TQuery>()` to accept the generic and pass it through.

**Rationale**: This is the minimal change — service methods can pass their typed query objects directly without casting, while existing callers that don't specify a query type get the default `Record<string, unknown>` behavior (backwards compatible).

**Alternative considered**: Create per-service typed request builders. Rejected — over-engineered for the problem. The generic approach eliminates all 9 casts with a single type change.

### 3. Replace `as Record<string, unknown>` in validation with type guards

**Decision**: In data validation functions (e.g., `fetch-transaction-list.ts`), replace `(value as Record<string, unknown>).data` with a proper `checkIsObject` type guard that narrows `unknown` to `Record<string, unknown>` safely.

**Rationale**: The validation functions already check `Array.isArray(...)` — they just need a safe narrowing step before property access. A single `checkIsObject` utility handles all 8 cases.

### 4. Conditional spreading for `exactOptionalPropertyTypes`

**Decision**: Replace `prop: condition ? value : undefined` patterns with conditional spreading: `...(condition && { prop: value })`. For JSX attributes, use `condition ? value : undefined` only when the attribute type explicitly includes `undefined` (like `aria-current`); otherwise omit the prop entirely via spread.

**Rationale**: This is the idiomatic TypeScript pattern for optional properties under `exactOptionalPropertyTypes`. It distinguishes "property not set" from "property set to undefined".

### 5. Place Zod schemas in `apps/money-tracker/src/constants/`

**Decision**: Keep the Zod enum definitions in `apps/money-tracker/src/constants/transaction.ts` rather than moving to `packages/shared`. The generated `TransactionType` from OpenAPI lives in shared, but the Zod validation layer is app-level.

**Rationale**: Only money-tracker uses these enums for form validation currently. Per the shared code placement guide, keep it in the app until multiple apps need it.

## Risks / Trade-offs

- **`exactOptionalPropertyTypes` may surface hidden bugs in third-party type definitions** → Mitigation: `skipLibCheck: true` is already enabled, so only project code is affected.
- **Generic `RequestOptions<TQuery>` increases type complexity slightly** → Mitigation: The default type parameter means existing code needs zero changes unless it passes a query.
- **30+ files need updating for `exactOptionalPropertyTypes`** → Mitigation: Changes are mechanical (pattern replacement), low risk of logic errors.
