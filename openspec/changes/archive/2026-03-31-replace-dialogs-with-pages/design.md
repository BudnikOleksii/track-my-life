## Context

Categories and transactions use `AlertDialog` modals for create/edit forms. The current architecture manages dialog state (`isFormOpen`, `editingEntity`) via custom hooks in client components, with form data passed as props. The app uses Next.js App Router with RSC data fetching, `react-hook-form` + Zod validation, and `next-intl` for i18n. The app header and sidebar already support nested routes via `pathname.startsWith()`.

## Goals / Non-Goals

**Goals:**

- Replace modal-based create/edit with dedicated page routes for better mobile UX
- Maintain existing server action and validation architecture
- Follow established RSC data fetching patterns (server wrapper + client form)
- Support browser navigation (back/forward) for create/edit flows

**Non-Goals:**

- Changing the delete confirmation flow (stays as dialog)
- Modifying form fields, validation rules, or server actions
- Adding new UI components to `packages/ui`
- Changing the app layout or navigation structure

## Decisions

### 1. Route structure: `/create` and `/[id]/edit` nested under feature routes

Routes follow Next.js App Router conventions:

- `categories/create/page.tsx` and `categories/[id]/edit/page.tsx`
- `transactions/create/page.tsx` and `transactions/[id]/edit/page.tsx`

**Rationale**: Nested routes keep form pages under the parent feature, the sidebar and header already highlight the parent route for nested paths. Alternative considered: separate route groups — rejected because it would break the natural hierarchy.

### 2. Form pages as `'use client'` components with server page wrappers

Each route has:

- `page.tsx` (server) — fetches data, renders form page component
- Form page component (client) — contains `react-hook-form`, handles submission, navigates back on success

**Rationale**: Matches the existing `page.tsx` + `page.content.tsx` pattern used throughout the app. Data fetching stays in RSC, form interaction stays in client components.

### 3. Navigation after submit via `useRouter().push()`

After successful create/update, the form page calls `router.push(PATHS.categories)` (or `PATHS.transactions`) from the shared i18n navigation module.

**Rationale**: The mutation server action already calls `revalidatePath()`, so the list page will show fresh data. Using `router.push` (client-side) is appropriate since the form submission is client-driven. Alternative: `redirect()` from `next/navigation` — not usable inside event handlers in client components.

### 4. Edit buttons become `Link` components styled as ghost buttons

In `CategoryTree` and `TransactionList`, the edit `Button` with `onClick` handler is replaced by a `Link` (from shared i18n navigation) with button-like styling via CSS classes.

**Rationale**: Using real `<a>` tags provides right-click "Open in new tab", proper accessibility semantics, and works without JavaScript. The `Link` component accepts `className` for styling.

### 5. Delete state simplified to inline `useState`

With dialog management hooks removed, delete state (`deletingCategory`/`deletingTransaction`) moves to a simple `useState` in the list page content component.

**Rationale**: The hooks existed primarily for form dialog state. With only delete dialog remaining, a hook is unnecessary overhead.

### 6. Single-entity fetch functions placed by scope

- `fetchCategory(id)` → `src/actions/fetch-category.ts` (shared, since categories are referenced by transactions)
- `fetchTransaction(id)` → `transactions/actions/fetch-transaction.ts` (feature-local)

**Rationale**: Follows the existing placement pattern where `fetchCategoryList` is in shared actions and `fetchTransactionList` is feature-local.

## Risks / Trade-offs

- **Extra navigation step**: Users now leave the list page to create/edit, adding a page transition. → Mitigated by the significant improvement in mobile form usability and proper back navigation.
- **Edit requires entity fetch**: Edit pages need a server-side fetch of the single entity by ID, adding one API call. → Acceptable cost; ensures fresh data and works with standard RSC patterns. If entity not found, show 404 via `notFound()`.
- **No optimistic UI for list→form→list flow**: After submit, user waits for navigation + revalidation. → Same behavior as current dialog flow (server action + revalidatePath). No regression.
