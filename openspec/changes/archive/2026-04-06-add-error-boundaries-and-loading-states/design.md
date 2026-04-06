## Context

The app has no error boundaries or route-level loading states. Currently:

- Unhandled errors render the default Next.js error page (white screen with stack trace in dev, generic error in prod)
- Route transitions show no loading indicator — the page appears to freeze until the new route's server components resolve
- The app already uses `<Suspense>` with skeleton fallbacks inside pages (dashboard widgets, transaction lists), but route-level navigation has no feedback
- A `Skeleton` atom exists in `packages/ui` and a `PageSkeleton` composition exists in the app-layout components
- The app uses next-intl with `[locale]` segment, SCSS modules for styling, and Radix UI primitives

## Goals / Non-Goals

**Goals:**

- Catch and display errors gracefully at route-group boundaries so the app never shows a raw error page
- Provide skeleton loading states during route transitions for all major app sections
- Create a reusable `ErrorState` component in `packages/ui` for consistent error presentation
- Support i18n for all user-facing error and loading text via next-intl
- Add a custom 404 page at the locale level

**Non-Goals:**

- Granular per-component error boundaries (existing Suspense boundaries inside pages already handle component-level loading)
- Error reporting/logging infrastructure (e.g., Sentry integration)
- Retry logic beyond a simple "try again" button that calls `reset()`
- Toast notifications for transient errors

## Decisions

### 1. Error boundary placement: route-group level, not per-page

Place `error.tsx` at three levels:

- `[locale]/error.tsx` — root fallback for any uncaught error
- `[locale]/(app-layout)/error.tsx` — catches errors within the authenticated app shell (sidebar/header remain visible)
- `[locale]/(auth-layout)/error.tsx` — catches errors in auth pages

**Rationale**: Per-page error files would add 20+ files with identical content. Route-group boundaries catch errors while preserving the enclosing layout (sidebar stays visible in app-layout errors), which is the right granularity.

### 2. ErrorState component in packages/ui

Create a framework-agnostic `ErrorState` component in `packages/ui/src/components/molecules/error-state/`. It accepts:

- `title: string` — error heading
- `description: string` — explanation text
- `onRetry?: () => void` — optional retry callback (wired to Next.js `reset()`)
- `onNavigateHome?: () => void` — optional "go home" callback

**Rationale**: Keeps the component reusable across apps. All i18n strings are passed as props (no next-intl dependency in packages/ui). Uses existing Button and Typography atoms.

### 3. Loading.tsx placement: major data-heavy routes only

Add `loading.tsx` to:

- `(app-layout)/dashboard/` — grid of skeleton widgets
- `(app-layout)/transactions/` — skeleton list with header
- `(app-layout)/categories/` — skeleton list with header
- `(app-layout)/budgets/` — skeleton placeholder
- `(app-layout)/settings/` — skeleton form fields

Do NOT add loading.tsx to:

- Form pages (create/edit) — these are fast since forms load from cached data or are empty
- Auth pages — these are lightweight static forms
- Nested routes like `transactions/by-category/[categoryId]` — parent loading.tsx covers navigation

**Rationale**: Only routes with noticeable data-fetching delays benefit from loading states. The existing in-page Suspense boundaries already handle streaming within pages; loading.tsx handles the route transition gap.

### 4. Not-found page at locale level

Add `[locale]/not-found.tsx` using the `ErrorState` component with a 404-specific message and a "go home" link.

**Rationale**: Single file covers all 404s within the locale. Uses the same visual language as error pages for consistency.

### 5. Skeleton compositions reuse existing PageSkeleton

Loading files will compose skeletons using the existing `PageSkeleton` component and the `Skeleton` atom. Dashboard loading will mirror its grid layout with skeleton widgets.

**Rationale**: Avoids creating new skeleton primitives. The existing components provide the right building blocks.

## Risks / Trade-offs

- [CLS from skeleton → content swap] → Skeletons are sized to approximate real content dimensions, and this matches the existing pattern used in-page Suspense fallbacks
- [Error boundary hides useful debug info] → In development, Next.js still shows its error overlay; the custom error.tsx is primarily for production UX
- [i18n strings in error boundaries] → error.tsx is a client component, so it uses `useTranslations` from next-intl. If the i18n provider itself errors, the root error.tsx will fall back to hardcoded English strings
