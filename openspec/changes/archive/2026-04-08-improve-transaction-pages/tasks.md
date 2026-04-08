## 1. Remove Currency Filter

- [x] 1.1 Remove `currencyCode` field from `TransactionFilters` interface in `transactions/constants/transaction-filters.ts`
- [x] 1.2 Remove `currencyCode` parsing from `parseTransactionSearchParams` in `transactions/constants/parse-transaction-search-params.ts`
- [x] 1.3 Remove `currencyCode` from `PAGE_RESET_KEY_SET` in `transactions/hooks/use-transaction-filters.ts`
- [x] 1.4 Remove currency normalization and params from `TransactionListServer.tsx`
- [x] 1.5 Remove `TransactionCurrencyFilter` usage from `transactions/page.content.tsx`
- [x] 1.6 Delete `TransactionCurrencyFilter` component directory
- [x] 1.7 Remove related i18n keys (`content.allCurrencies`) from translation files

## 2. CategoryPicker Enhancement — "All" Options

- [x] 2.1 Add `showAllOption` prop to `CategoryPickerProps` interface
- [x] 2.2 Add `allCategoriesLabel` and `allParentLabel` optional props for i18n text
- [x] 2.3 Update `useCategoryPicker` hook to accept `showAllOption` param
- [x] 2.4 When `showAllOption` is enabled, prepend "All Categories" entry to `mainCategoryList` that calls `onValueChange('')`
- [x] 2.5 When `showAllOption` is enabled and a parent has subcategories, prepend "All [Parent Name]" entry to `activeSubcategoryList` that calls `onValueChange(parentId)`
- [x] 2.6 Update `selectedDisplayName` to handle empty value (show "All Categories" label) when `showAllOption` is enabled

## 3. Replace Category Filter with CategoryPicker

- [x] 3.1 Replace `TransactionCategoryFilter` with `CategoryPicker` in `transactions/page.content.tsx`, passing `showAllOption`, filter type, and category list
- [x] 3.2 Handle type filter mapping: when filter type is "ALL", pass a type that shows all categories (or omit type filtering in the picker)
- [x] 3.3 Update `useTransactionFilters` to wire `onValueChange` to `handleFilterChange({ categoryId })`
- [x] 3.4 Delete `TransactionCategoryFilter` component directory
- [x] 3.5 Update secondary filter row styles if needed (single item instead of two)

## 4. Show Category Info in Transaction List

- [x] 4.1 Add category display helper function to format `CategoryInfoDto` as "Parent / Subcategory" or just category name
- [x] 4.2 Add category info to each transaction row's secondary area in `TransactionList.tsx`
- [x] 4.3 Add SCSS styles for category label in the transaction row
- [x] 4.4 Add i18n translation keys if needed (e.g., separator)

## 5. Show Category Info in Recurring Transaction List

- [x] 5.1 Add category info to each recurring transaction row's secondary area in `RecurringTransactionList.tsx`
- [x] 5.2 Add SCSS styles for category label in the recurring transaction row

## 6. Accordion Groups on By-Category Page

- [x] 6.1 Import Accordion components from `@track-my-life/ui` into `page.content.tsx`
- [x] 6.2 Wrap each group in `AccordionItem` with group header as `AccordionTrigger` and transaction list as `AccordionContent`
- [x] 6.3 Set accordion to multi-expand mode with no default open items
- [x] 6.4 Update SCSS styles — move group header styling to work as accordion trigger, adjust spacing

## 7. Copy Transaction — Routing & Path Helper

- [x] 7.1 Add `getTransactionsCopyPath(id)` helper to `src/constants/paths.ts` that returns `/transactions/create?copyFrom={id}`
- [x] 7.2 Add copy button (Copy icon from lucide-react) to transaction row actions in `TransactionList.tsx`
- [x] 7.3 Add i18n translation key for copy button aria-label

## 8. Copy Transaction — Create Page & Form

- [x] 8.1 Update create page `page.tsx` to accept `searchParams`, extract `copyFrom` param
- [x] 8.2 When `copyFrom` is present, fetch the source transaction by ID in the server component
- [x] 8.3 Add `sourceTransaction` prop to `TransactionFormPage` component
- [x] 8.4 Update `useTransactionFormPage` hook: when `sourceTransaction` is provided and `transaction` is null, prefill type, categoryId, amount, description from source; use today's date and current time
- [x] 8.5 Ensure `isEditing` remains false in copy mode (form submits as create, not update)
