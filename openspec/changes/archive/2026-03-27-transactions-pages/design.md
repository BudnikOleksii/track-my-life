## Context

The money-tracker app has a stub transactions page (title only). The categories CRUD is fully implemented and serves as the architectural reference. Transaction types, DTOs, and API endpoints already exist in the generated OpenAPI types (`TransactionResponseDto`, `CreateTransactionDto`, `UpdateTransactionDto`, `TransactionListResponseDto`). The API supports pagination, filtering, and standard CRUD operations.

## Goals / Non-Goals

**Goals:**

- Full transaction CRUD following the established categories pattern
- Paginated list view with type and date range filtering
- Form with category selector, type toggle, amount, currency, date, and optional description
- Consistent UX with existing pages (same layout, component patterns, i18n)

**Non-Goals:**

- Recurring transactions management (separate future feature)
- Bulk import/export of transactions
- Charts or analytics on the transactions page (belongs in dashboard)
- Currency conversion or multi-currency display

## Decisions

### Follow categories CRUD pattern exactly

**Decision:** Mirror the `categories/` folder structure — server actions, Zod schema, management hook, form component, delete dialog.
**Rationale:** Consistency reduces cognitive load. The pattern is proven and handles optimistic updates, validation, and error states. No reason to deviate.

### Client-side state management via custom hook

**Decision:** Use a `useTransactionManagement` hook similar to `useCategoryManagement` for list state, dialog state, and CRUD callbacks.
**Rationale:** Keeps the page content component clean. Matches existing pattern. Server actions handle revalidation.

### Pagination with URL state (nuqs)

**Decision:** Store page number, page size, type filter, and date range in URL search params using `nuqs`.
**Rationale:** Enables shareable/bookmarkable filtered views. Aligns with the project convention for URL state management.

### Transaction API service in shared package

**Decision:** Create `transaction-api.service.ts` in `packages/shared/src/api/services/` extending `ApiClient`, with instance exported from `server-api.ts`.
**Rationale:** Follows the established pattern (`CategoryApiService`). Each service file exports its own instance per project convention.

### Category selector as Combobox

**Decision:** Use the existing `Combobox` component from `packages/ui` for category selection in the form, filtered by transaction type.
**Rationale:** Categories can grow large; a searchable dropdown is better UX than a plain select. The component already exists.

## Risks / Trade-offs

- **[Large category lists in form]** → Combobox handles this with search; fetch categories on form open, not on page load
- **[Pagination adds complexity]** → Worth it for performance; transactions grow unbounded unlike categories
- **[URL state coupling]** → nuqs is already a project dependency and convention; acceptable coupling
