## Context

The money-tracker app uses Next.js 16 with App Router, organized in a monorepo with Turborepo. Authentication is complete with sign-in, sign-up, and email verification flows. The `(app)` route group currently contains only a bare `/dashboard` page with no shared layout, navigation, or structural scaffolding.

The UI package provides atoms (Button, Typography, Avatar, Badge) and molecules (Card, Breadcrumb) built on Radix UI primitives with SCSS modules and design tokens. The app uses `next-intl` for i18n with locale-based routing (`[locale]`).

Existing route groups follow the `-layout` suffix convention: `(home-layout)`, `(auth-layout)`. The `(app)` group needs to be renamed to `(app-layout)` per project conventions.

## Goals / Non-Goals

**Goals:**

- Establish a persistent app shell layout with sidebar navigation and top header
- Create responsive navigation that works on desktop (sidebar) and mobile (collapsible)
- Scaffold stub pages for all planned sections (Transactions, Categories, Budgets, Settings)
- Follow existing patterns: SCSS modules, Typography atom for all text, i18n for all strings, server components where possible

**Non-Goals:**

- Building out actual feature content for any page (transactions list, budget charts, etc.)
- User settings/profile functionality beyond a placeholder page
- Backend API integration for any new features
- Search functionality or notifications system
- Breadcrumb navigation (can be added per-feature later)

## Decisions

### 1. Rename `(app)` to `(app-layout)` route group

Following the established convention of `(home-layout)` and `(auth-layout)`, the authenticated route group will be `(app-layout)`. This keeps naming consistent across the codebase.

**Alternative**: Keep `(app)` as-is. Rejected because it breaks the established naming convention.

### 2. Sidebar + header layout architecture

The app shell will use a classic sidebar + top header pattern:

- **Sidebar** (left): Navigation links with icons, collapsible on desktop, hidden on mobile with a hamburger toggle
- **Header** (top): Page title, user avatar with dropdown menu
- **Main content area**: Renders the page content via `children`

The layout component lives at `(app-layout)/layout.tsx` as a server component. Interactive parts (sidebar toggle, user menu) are isolated client components.

**Alternative**: Bottom tab navigation only. Rejected because the app will grow to have many sections, and sidebar scales better for desktop while we can still add bottom nav for mobile.

### 3. Navigation component structure

```
(app-layout)/
  layout.tsx                    (server component - shell structure)
  components/
    app-sidebar/
      AppSidebar.tsx            (client - handles collapse state)
      AppSidebar.module.scss
      nav-item/
        NavItem.tsx             (client - active state via usePathname)
        NavItem.module.scss
    app-header/
      AppHeader.tsx             (server component)
      AppHeader.module.scss
      user-menu/
        UserMenu.tsx            (client - dropdown interaction)
        UserMenu.module.scss
```

Components live in the route group's `components/` directory since they are specific to the app layout, not reusable UI primitives.

**Alternative**: Add to `packages/ui`. Rejected because these are app-specific layout components, not generic UI components.

### 4. Route structure for new pages

All new routes follow the existing page pattern with `page.tsx` (server, metadata) and `page.content.tsx` (client content):

```
(app-layout)/
  dashboard/
  transactions/
  categories/
  budgets/
  settings/         (uses (settings-layout) sub-group for future nested settings)
    (settings-layout)/
      page.tsx
      page.content.tsx
```

**Alternative**: Nest settings under a separate route group at the top level. Rejected because settings is part of the authenticated app experience.

### 5. Mobile responsiveness approach

Use CSS-only responsive behavior with SCSS breakpoints (already defined in the UI package):

- Desktop (≥768px): Sidebar visible, collapsible to icon-only mode
- Mobile (<768px): Sidebar hidden by default, toggled via hamburger button in header, overlays content

State management for sidebar open/close uses React `useState` in the sidebar client component. No global state library needed.

### 6. Icons via Lucide React

Navigation icons use `lucide-react` (already a dependency). Specific icons:

- Dashboard: `LayoutDashboard`
- Transactions: `ArrowLeftRight`
- Categories: `Tags`
- Budgets: `Wallet`
- Settings: `Settings`

## Risks / Trade-offs

- [Sidebar state not persisted across page navigations] → The sidebar collapse preference resets on full page loads. Acceptable for now; can add cookie/localStorage persistence later if needed.
- [Stub pages are minimal] → Pages will just show a title and "coming soon" message. This is intentional—feature content is out of scope for this change.
- [No loading states for navigation] → Next.js App Router handles route transitions. Can add `loading.tsx` files per-route later if needed.
