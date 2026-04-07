## Why

The transaction create/edit form has usability issues: the type selector uses a dropdown instead of visible radio buttons, the currency field is a redundant read-only input (since multi-currency is not supported), the category picker is a flat combobox that doesn't show the parent→subcategory hierarchy, and the date field lacks time selection. These issues make the form slower to use and less intuitive compared to modern finance tracker UIs.

## What Changes

- **Transaction type selector**: Replace the `Select` dropdown with a `RadioGroup` component (pill-style radio buttons showing Income/Expense side by side)
- **Currency field removal + amount mask**: Remove the standalone currency field. Show the user's base currency symbol/code as a prefix mask inside the amount `Input` field
- **Two-level category picker**: Replace the flat `Combobox` with a two-panel category selector — left panel shows main categories (where `parentCategoryId === null`), right panel shows subcategories of the selected main category. Selecting a main category sets the `categoryId`; selecting a subcategory overrides it with the more specific subcategory ID
- **Time picker component**: Create a new `TimePicker` component in `packages/ui` (simple hour:minute selector, shadcn-style). Update the date field to capture both date and time, defaulting to current date and time
- **Form schema updates**: Update the Zod schema to remove `currencyCode` as a form field (inject it server-side), add a `time` field, and adjust category validation for the hierarchical picker

## Capabilities

### New Capabilities

- `time-picker-ui`: A reusable TimePicker component in packages/ui with hour/minute selection
- `category-hierarchical-picker`: A two-panel category picker component showing parent categories and their subcategories
- `transaction-type-radio`: Radio button group for transaction type selection replacing the Select dropdown

### Modified Capabilities

- `transaction-form-page`: Update form layout — radio type selector, amount with currency mask, hierarchical category picker, date+time fields, remove currency field
- `transaction-form-ui`: Update form schema, validation, and submission logic for new field structure

## Impact

- **packages/ui**: New `TimePicker` component, new `RadioGroup` atom (from Radix UI)
- **apps/money-tracker transactions form**: Major refactor of `TransactionFormPage.tsx`, `use-transaction-form-page.ts`, and `transaction-form-schema.ts`
- **apps/money-tracker transaction actions**: `createTransaction` and `updateTransaction` server actions need to handle the time component in the date field and inject currency server-side
- **i18n**: New translation keys for time picker labels, category picker UI, and radio button labels
- **API contract**: No backend changes — `categoryId` still accepts any valid category ID (parent or child), `date` already accepts ISO datetime strings
