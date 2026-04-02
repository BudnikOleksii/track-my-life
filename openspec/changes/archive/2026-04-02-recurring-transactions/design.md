## Context

The money-tracker app has a working transactions feature (Phase 3) with full CRUD, filtering, and pagination. The backend already exposes all recurring transaction endpoints (`/api/recurring-transactions`) with CRUD, pause/resume, and batch processing. Generated TypeScript types exist in `packages/shared`. The app follows a consistent pattern: API service → server actions/fetch wrappers → server page with Suspense → client content component.

Recurring transactions let users define repeating financial entries (rent, subscriptions, salary) that the backend automatically creates on schedule. This phase adds the frontend to manage them.

## Goals / Non-Goals

**Goals:**

- Full CRUD for recurring transactions with list, create, detail, and edit pages
- Pause/resume control for individual recurring transactions
- Status and frequency filtering on the list page
- Follow all existing patterns from the transactions feature (API service, server actions, page structure, i18n)

**Non-Goals:**

- Manual trigger / "run now" functionality (backend handles scheduling via `/process` endpoint)
- Notifications or reminders for upcoming recurring transactions
- Bulk operations (pause all, delete multiple)
- Calendar view of upcoming occurrences

## Decisions

### 1. Follow transactions feature structure exactly

**Decision:** Mirror the file organization, naming, and patterns from `(app-layout)/transactions/`.

**Rationale:** Consistency reduces cognitive load. The transactions feature is well-established with server/client page split, feature-local actions, Zod form schemas, and component-per-folder structure. No reason to deviate.

### 2. API service in packages/shared

**Decision:** Create `RecurringTransactionApiService` in `packages/shared/src/api/services/recurring-transaction-api.service.ts` extending `ApiClient`, exporting its own instance.

**Rationale:** Matches the established pattern (each service file exports its own instance, no central registry). Uses generated types from `types.gen.ts`.

### 3. Dedicated pages for create/edit (not dialogs)

**Decision:** Use dedicated route pages (`/create`, `/[id]/edit`) rather than modal dialogs.

**Rationale:** The app already moved from dialog-based to dedicated pages for categories and transactions (commit 0cb6486). Recurring transaction forms have more fields (frequency, interval, dates) making full pages the better UX.

### 4. Card-based list layout

**Decision:** Use card-based layout for the recurring transaction list rather than a data table.

**Rationale:** Recurring transactions have rich status information (frequency, next occurrence, status badge) that displays better in cards. The list is typically smaller than regular transactions, making cards more appropriate than a dense table.

### 5. Server actions for mutations, plain fetch for reads

**Decision:** Server actions (`'use server'`) for create/update/delete/pause/resume. Plain async functions for fetching list and detail data.

**Rationale:** Matches the established server actions vs client API pattern. Read functions are callable from RSC, mutations use `revalidatePath` for cache invalidation.

### 6. URL search params for filters

**Decision:** Status and frequency filters stored in URL search params, parsed on the server page.

**Rationale:** Consistent with transactions feature. Enables shareable/bookmarkable filtered views and server-side data fetching with filters.

## Risks / Trade-offs

- **[Risk] Form complexity with frequency + interval + dates** → Mitigated by reusing existing form patterns (react-hook-form + Zod) and UI primitives (Select, DatePicker). Conditional fields (e.g., end date optional) handled via Zod schema.
- **[Risk] Status transitions may fail (e.g., pausing already paused)** → Backend returns appropriate errors. Server actions return null on error, UI shows toast notification.
- **[Risk] i18n for two locales (en/uk) increases file count** → Acceptable, follows existing pattern. Both locale files created together.
