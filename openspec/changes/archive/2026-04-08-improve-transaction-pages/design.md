## Context

The money-tracker app has transaction list pages (main, recurring, by-category) that work but lack polish. The by-category page shows all transactions expanded, transaction rows don't show category info, there's an unused currency filter, the category filter is a flat select, and there's no way to duplicate transactions. All data needed (e.g., `CategoryInfoDto` on response DTOs) already exists in the API.

## Goals / Non-Goals

**Goals:**

- Improve by-category page readability with collapsible accordion groups
- Show category context in transaction list rows
- Simplify filters by removing unused currency filter
- Upgrade category filter to use existing hierarchical CategoryPicker with "All" support
- Enable quick transaction duplication via copy button + prefilled create form

**Non-Goals:**

- Multi-currency support or currency conversion
- Batch transaction operations
- Drag-and-drop reordering of transactions
- Changes to recurring transaction create/edit forms

## Decisions

### 1. Accordion for by-category groups

Use the existing `@track-my-life/ui` Accordion component (`packages/ui/src/components/molecules/accordion/accordion.tsx`). Each `TransactionGroupDto` maps to an accordion item. The group header (subcategory name + totals) becomes the accordion trigger. Default all items to collapsed.

**Alternative considered:** Virtual scrolling — rejected because the grouping structure matters more than raw list length, and accordions are simpler.

### 2. Category info display format

Display as `"Parent / Subcategory"` when a parent exists, otherwise just the category name. This matches the existing `selectedDisplayName` pattern in `useCategoryPicker`. Place it in the secondary info area of each row, before the description.

**Alternative considered:** Separate column — rejected to maintain the compact row layout.

### 3. CategoryPicker as filter — "All" options

Enhance `useCategoryPicker` to accept an optional `showAllOption` prop. When enabled:

- An "All Categories" item appears at the top of the main list, selecting it calls `onValueChange('')` (empty string = no filter)
- When a parent category with subcategories is active, an "All [Parent Name]" item appears at the top of the subcategory panel, selecting it calls `onValueChange(parentId)` to filter by the entire parent category

The CategoryPicker also needs a `transactionType` value when used as a filter. Since filters include a type filter, pass the current filter type. When type is "ALL", show all categories regardless of type.

**Alternative considered:** Building a separate filter-specific picker — rejected to avoid duplication and keep a single component.

### 4. Copy transaction via URL search params

Add a `copyFrom` search param to the create page. The server component fetches the source transaction by ID and passes it to the form as `sourceTransaction`. The form hook detects `sourceTransaction` (non-null) + no `transaction` (not editing) = copy mode. Prefills type, categoryId, amount, description from source but uses today's date and current time.

**Alternative considered:** Client-side fetch on create page — rejected because server component can fetch and stream data, consistent with existing patterns.

### 5. Currency filter removal

Clean removal: delete `TransactionCurrencyFilter` component, remove `currencyCode` from `TransactionFilters` interface, `parseTransactionSearchParams`, `useTransactionFilters` hook's reset keys, and `TransactionListServer` normalization. The API param can still accept currencyCode but we simply won't send it.

## Risks / Trade-offs

- **CategoryPicker complexity increase** → The "All" options add conditional logic to the hook. Mitigated by keeping it behind the `showAllOption` prop so form usage is unaffected.
- **Copy transaction with deleted category** → If the source transaction's category was deleted, the form will show an empty category. This is acceptable — the user must pick a valid category before submitting anyway, since the form validates `categoryId`.
- **Accordion performance with many groups** → Radix Accordion handles this well with lazy content rendering. No custom virtualization needed.
