## Why

The transaction pages lack usability features that make daily use cumbersome: the by-category page shows all transactions inline without collapsing, transaction lists don't show which category a transaction belongs to, the currency filter is unnecessary for a single-currency app, the category filter uses a basic select instead of the hierarchical picker, and there's no way to quickly duplicate a transaction.

## What Changes

- **Accordion groups on by-category page**: Wrap each subcategory's transaction list in a collapsible accordion (default collapsed) so users can expand only the groups they care about.
- **Category info on transaction lists**: Show parent/subcategory name (e.g., "Food / Groceries") in each transaction row on both the main transactions page and recurring transactions page. The API already provides `CategoryInfoDto` on response DTOs.
- **Remove currency selector**: Remove the `TransactionCurrencyFilter` component and all `currencyCode` filter logic from the transactions page. Multi-currency is not planned.
- **Replace category filter with CategoryPicker**: Swap the flat `TransactionCategoryFilter` select for the hierarchical `CategoryPicker` component. Enhance `CategoryPicker` to support selecting a parent category directly (via an "All" option in the subcategory panel) and an "All Categories" reset option.
- **Copy transaction button**: Add a copy icon to each transaction row that navigates to the create page with the transaction's data prefilled (type, category, amount, description) but with today's date and current time, so users can quickly create similar transactions.

## Capabilities

### New Capabilities

- `transaction-copy`: Copy/duplicate transaction feature — copy button in list, prefilled create form via `copyFrom` search param
- `accordion-category-groups`: Collapsible accordion for by-category transaction groups

### Modified Capabilities

- `transaction-list-ui`: Add category info display to transaction rows, add copy action button
- `recurring-transaction-list-ui`: Add category info display to recurring transaction rows
- `category-hierarchical-picker`: Add "All" parent selection option and "All Categories" reset option for use as a filter
- `transaction-advanced-filters`: Remove currency filter, replace category select with CategoryPicker
- `transaction-form-page`: Support prefilling form from copied transaction (create mode with source data)

## Impact

- **UI components**: `TransactionList`, `RecurringTransactionList`, `CategoryDetailContent`, `CategoryPicker`, `TransactionsPageContent`, `TransactionFormPage`
- **Hooks**: `useCategoryPicker` (new "All" options), `useTransactionFormPage` (copy mode support)
- **Filters**: `TransactionFilters` interface (remove `currencyCode`), `parseTransactionSearchParams`, `useTransactionFilters`
- **Routing**: New `getTransactionsCopyPath` helper, create page accepts `copyFrom` search param
- **Deletions**: `TransactionCurrencyFilter` component, currency-related filter code
- **Dependencies**: Uses existing `@track-my-life/ui` Accordion component
