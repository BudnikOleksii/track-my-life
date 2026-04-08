## 1. UI Atoms in packages/ui

- [x] 1.1 Install `@radix-ui/react-radio-group` dependency in packages/ui
- [x] 1.2 Create `RadioGroup` and `RadioGroupItem` components in `packages/ui/src/components/atoms/radio-group/` with pill-style variant styling (SCSS module)
- [x] 1.3 Create `TimePicker` component in `packages/ui/src/components/atoms/time-picker/` with hours/minutes inputs, string value API ("HH:mm"), keyboard arrow key support, and SCSS module styling

## 2. Amount Input with Currency Prefix

- [x] 2.1 Add `startAdornment` prop support to the existing `Input` component in packages/ui (render a prefix element inside the input wrapper with proper padding)

## 3. CategoryPicker Component

- [x] 3.1 Create `CategoryPicker` component in `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/components/category-picker/` with two-panel layout (main categories left, subcategories right)
- [x] 3.2 Implement category grouping logic: filter main categories by transaction type, group subcategories by `parentCategoryId`
- [x] 3.3 Implement selection behavior: selecting main category sets `categoryId`, selecting subcategory overrides it; collapse picker on final selection
- [x] 3.4 Style the CategoryPicker with SCSS module (two-column grid, active state highlighting, expand/collapse animation)

## 4. Transaction Form Schema Update

- [x] 4.1 Update `transaction-form-schema.ts`: remove `currencyCode` field, add `time` field with "HH:mm" regex validation
- [x] 4.2 Update `use-transaction-form-page.ts`: add time default value (current time for new, parsed from transaction date for edit), combine date+time on submit, remove currency from form values

## 5. Transaction Form Page Refactor

- [x] 5.1 Replace `Select` type selector with `RadioGroup` pill buttons in `TransactionFormPage.tsx`
- [x] 5.2 Replace `Combobox` category field with `CategoryPicker` component
- [x] 5.3 Replace read-only currency `Input` with `startAdornment` on the amount `Input` showing baseCurrencyCode
- [x] 5.4 Add `TimePicker` next to the date input in a row layout
- [x] 5.5 Update `TransactionFormPage.module.scss` for new layout (date+time row, radio group spacing)

## 6. Server Action Currency Injection

- [x] 6.1 Update `createTransaction` server action — removed form schema validation (form schema diverged from DTO), server now accepts `CreateTransactionDto` directly; currency is injected client-side from `baseCurrencyCode` prop
- [x] 6.2 Update `updateTransaction` server action — removed form schema validation, server accepts `UpdateTransactionDto` directly

## 7. i18n Updates

- [x] 7.1 Add translation keys for time picker labels, category picker UI labels, and radio button labels in the `transactionsFormPage` namespace (all supported locales)

## 8. Verification

- [x] 8.1 Run `pnpm type-check` and fix any TypeScript errors
- [x] 8.2 Run `pnpm lint` and `pnpm stylelint` and fix any lint issues
- [x] 8.3 Run `pnpm build` to verify production build succeeds
