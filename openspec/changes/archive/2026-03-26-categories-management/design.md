## Context

The money-tracker app currently has stub pages for categories and settings but no functional category management. The backend API exposes `/api/transaction-categories` endpoints for CRUD operations. Categories support a parent-child hierarchy (subcategories) and two types: INCOME and EXPENSE. The existing codebase follows a feature-based folder structure with server actions, react-hook-form + Zod for forms, and `ApiClient`-based service classes in `packages/shared`.

## Goals / Non-Goals

**Goals:**

- Deliver a fully functional categories settings page with tree view, create/edit/delete flows
- Follow established patterns (ApiClient service, server actions, feature-scoped file layout)
- Add reusable UI atoms (Checkbox, Select) to `@track-my-life/ui` for use across the app
- Support full i18n for all category management strings

**Non-Goals:**

- Category analytics or usage statistics
- Drag-and-drop reordering of categories
- Category import/export
- Budget assignment per category (Phase 3)
- Icon picker or color picker component (use simple text input / predefined palette for now)

## Decisions

### 1. Categories live under settings route, not top-level

Categories management moves to `/settings/categories` instead of the current `/categories` stub. The top-level `/categories` route is not needed — categories are a configuration concern, not a daily-use view.

**Alternative**: Keep `/categories` as the main route. Rejected because the overview plan explicitly places it under settings, and it aligns with the pattern of other config pages.

### 2. Modal-based create/edit instead of dedicated pages

Category forms appear in modals (using Radix `Dialog`) rather than separate routes. Categories have few fields (name, type, parent, icon, color), so a modal keeps the user in context.

**Alternative**: Inline editing in the tree. Rejected because it complicates the tree component and doesn't scale well to the full form (type selection, parent picker).

### 3. CategoryApiService follows AuthApiService pattern

Each service file exports its own pre-configured instance. The service extends `ApiClient` and defines `BASE_URL` + `ENDPOINTS` constants, matching `auth-api.service.ts`.

**Alternative**: Central service registry. Rejected per project convention (each service exports its own instance).

### 4. Server actions for mutations

Create, update, and delete operations use Next.js server actions (files in `actions/` directory) that call the API service server-side. This keeps auth tokens server-side and matches the existing pattern.

### 5. Accordion-based category tree

`CategoryTree` uses the existing `Accordion` component from `@track-my-life/ui` to show parent categories as expandable sections with nested subcategories. This avoids building a custom tree component.

### 6. Predefined color palette instead of color picker

Categories select from a predefined set of colors (8-12 options) rendered as swatches rather than a full color picker. This keeps scope small and ensures visual consistency.

**Alternative**: Full color picker dependency. Rejected to avoid new dependency and keep Phase 1 lean.

## Risks / Trade-offs

- **[API types not yet generated]** → The generated types from `@hey-api/openapi-ts` may not include category types yet. Mitigation: generate types first or define interim interfaces matching the API contract.
- **[Stub page replacement]** → Removing the `/categories` stub may break navigation links. Mitigation: update sidebar nav links as part of this change.
- **[No optimistic updates]** → CRUD operations wait for server response before updating UI. Mitigation: acceptable for settings page with low interaction frequency; can add later if needed.
- **[Parent category selection UX]** → Select/Combobox for parent picker may be awkward with many categories. Mitigation: filterable Combobox component handles this; can add search later.
