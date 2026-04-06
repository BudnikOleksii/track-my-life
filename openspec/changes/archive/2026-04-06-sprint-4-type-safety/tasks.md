## 1. Zod Enum Types

- [x] 1.1 Define `transactionTypeSchema` as `z.enum(['INCOME', 'EXPENSE'])` in `apps/money-tracker/src/constants/transaction.ts` and derive `TRANSACTION_TYPE` from `transactionTypeSchema.enum` and `TransactionType` via `z.infer`
- [x] 1.2 Define `filterValueSchema` as `z.enum(['ALL', 'INCOME', 'EXPENSE'])` in the same file, derive `FILTER_OPTION_LIST` from `filterValueSchema.options` and `FilterValue` via `z.infer`
- [x] 1.3 Update `transaction-form-schema.ts` and `category-form-schema.ts` to use `transactionTypeSchema` directly for the `type` field
- [x] 1.4 Update `recurring-transaction-form-schema.ts` to use `transactionTypeSchema` for the `type` field
- [x] 1.5 Update all remaining imports of `TransactionType` from `@track-my-life/shared/src/api/generated/types.gen` to use the app-level Zod-derived type where applicable

## 2. Typed API Query

- [x] 2.1 Add generic `TQuery` parameter to `RequestOptions` interface in `packages/shared/src/api/client/types.ts`, defaulting to `Record<string, unknown>`
- [x] 2.2 Update `ApiClient.request()` and `requestBlob()` method signatures to accept `TQuery` generic and pass it through
- [x] 2.3 Remove all `as Record<string, unknown>` casts from `transaction-api.service.ts` (2 instances)
- [x] 2.4 Remove `as Record<string, unknown>` cast from `category-api.service.ts` (1 instance)
- [x] 2.5 Remove `as Record<string, unknown>` cast from `recurring-transaction-api.service.ts` (1 instance)
- [x] 2.6 Remove all `as Record<string, unknown>` casts from `transactions-analytics-api.service.ts` (5 instances)
- [x] 2.7 Create `checkIsObject` type guard in `packages/shared/src/constants/` that narrows `unknown` to `Record<string, unknown>`
- [x] 2.8 Replace all `(value as Record<string, unknown>).property` patterns in data validation functions (8 files in actions/) with `checkIsObject` guard
- [x] 2.9 Replace `as Record<string, unknown>[]` cast in `parse-import-file.ts`

## 3. Enable exactOptionalPropertyTypes

- [x] 3.1 Add `"exactOptionalPropertyTypes": true` to `packages/typescript-config/base.json`
- [x] 3.2 Fix conditional undefined patterns in `packages/shared/src/` (api-client.ts, NavigationLink.tsx)
- [x] 3.3 Fix conditional undefined patterns in `apps/money-tracker/src/` components (ProfileForm, AppSidebar, SidebarProvider, form pages, etc.)
- [x] 3.4 Run `pnpm type-check` and fix any remaining type errors

## 4. Verification and Cleanup

- [x] 4.1 Run `pnpm type-check` — zero errors
- [x] 4.2 Run `pnpm lint` — zero errors
- [x] 4.3 Run `pnpm build` — successful build
- [x] 4.4 Update IMPROVEMENTS.md — mark items 9, 13, 20 as Done
