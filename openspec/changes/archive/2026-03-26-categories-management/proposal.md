## Why

The money-tracker app needs a way to organize transactions by type. Without categories and subcategories, users cannot classify income/expenses, making the app unusable for its core purpose — personal finance tracking. Categories are a prerequisite for transactions and budgets (Phases 2-3).

## What Changes

- Add `CategoryApiService` in `packages/shared` with full CRUD operations against `/api/transaction-categories`
- Build categories management UI under `/settings/categories` with a tree view supporting parent-child hierarchy
- Support two category types: INCOME and EXPENSE, with filtering
- Create/edit categories via modal forms (react-hook-form + Zod) with name, type, icon, color, and optional parent
- Delete categories with confirmation dialog
- Add `Checkbox` and `Select`/`Combobox` UI atoms to `@track-my-life/ui`
- Extend `categoriesPage` i18n namespace with all required translations

## Capabilities

### New Capabilities

- `category-crud`: API service layer for category CRUD operations (fetch list, fetch by ID, create, update, delete)
- `category-settings-ui`: Settings page UI with category tree, type filter, form modal, and delete dialog
- `category-ui-atoms`: New shared UI primitives (Checkbox, Select/Combobox) needed by category forms

### Modified Capabilities

## Impact

- **Routes**: New settings sub-route at `/settings/categories` — the existing stub `/categories` page under `(app-layout)` will be replaced or redirected
- **API**: New `CategoryApiService` in `packages/shared/src/api/services/`
- **UI library**: New `Checkbox` and `Select`/`Combobox` atoms in `packages/ui`
- **i18n**: Extended `categoriesPage` namespace across all supported locales
- **Dependencies**: May need a color picker or icon picker library
