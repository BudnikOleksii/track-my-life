## Why

Category and transaction create/edit forms currently render inside modal dialogs, which are cramped and difficult to use on mobile devices. Replacing these modals with dedicated full-page routes improves mobile usability and provides a cleaner editing experience with proper URL-based navigation.

## What Changes

- Replace `AlertDialog`-based create/edit forms with dedicated `/create` and `/[id]/edit` page routes for both categories and transactions
- Convert "Create" buttons on list pages from dialog openers to navigation links
- Convert edit action buttons in category tree and transaction list from dialog openers to navigation links
- Add back navigation from form pages to their respective list pages
- Add single-entity fetch functions (`fetchCategory`, `fetchTransaction`) for edit page data loading
- Add new i18n translation keys for form page titles and navigation labels
- Keep delete confirmation dialogs unchanged on list pages
- Remove dialog state management hooks that are no longer needed

## Capabilities

### New Capabilities

- `category-form-page`: Dedicated create/edit page routes for categories with full-page form layout, back navigation, and server-side data fetching
- `transaction-form-page`: Dedicated create/edit page routes for transactions with full-page form layout, back navigation, and server-side data fetching

### Modified Capabilities

- `category-settings-ui`: Create/edit category requirements change from modal dialog to dedicated page routes; delete stays as dialog
- `transaction-form-ui`: Create/edit transaction requirements change from modal dialog to dedicated page routes
- `transaction-list-ui`: "Create Transaction" button and edit actions change from dialog openers to navigation links

## Impact

- **Routes**: 4 new Next.js App Router pages under `(app-layout)/categories/` and `(app-layout)/transactions/`
- **Components**: New `CategoryFormPage` and `TransactionFormPage` client components; old dialog form components deleted
- **Hooks**: Dialog state management hooks (`useCategoryDialogs`, `useTransactionDialogs`) removed; form hooks adapted for page context
- **Data fetching**: New `fetchCategory(id)` and `fetchTransaction(id)` RSC read functions
- **i18n**: New translation keys in `categories-page` and `transactions-page` namespaces
- **Paths**: New entries in `src/constants/paths.ts` for create/edit routes
- **No breaking API changes**: Server actions and validation schemas remain unchanged
