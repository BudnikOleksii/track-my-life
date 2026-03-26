## 1. Route Group & Path Constants

- [x] 1.1 Rename `(app)` route group to `(app-layout)` and update any references
- [x] 1.2 Add path constants for `transactions`, `categories`, `budgets`, and `settings` to `paths.ts`

## 2. i18n Messages

- [x] 2.1 Create `navigation.json` message files (en, uk) with sidebar labels and page titles
- [x] 2.2 Create `transactions-page.json` message files (en, uk) with page title
- [x] 2.3 Create `categories-page.json` message files (en, uk) with page title (update existing if present)
- [x] 2.4 Create `budgets-page.json` message files (en, uk) with page title
- [x] 2.5 Create `settings-page.json` message files (en, uk) with page title
- [x] 2.6 Register new i18n namespaces in the namespace constants

## 3. App Shell Layout

- [x] 3.1 Create the `(app-layout)/layout.tsx` server component with sidebar + header + main content structure
- [x] 3.2 Create `AppSidebar` client component with collapse/expand state and navigation links
- [x] 3.3 Create `NavItem` client component with active route detection via `usePathname`
- [x] 3.4 Create SCSS modules for sidebar with 240px expanded / 64px collapsed widths
- [x] 3.5 Create `AppHeader` server component with page title and user menu slot
- [x] 3.6 Create SCSS modules for header layout

## 4. User Menu

- [x] 4.1 Create `UserMenu` client component with avatar trigger and dropdown
- [x] 4.2 Implement sign-out action in user menu dropdown (call existing logout API)

## 5. Mobile Responsiveness

- [x] 5.1 Add mobile sidebar overlay behavior (hidden by default, toggled via hamburger button)
- [x] 5.2 Add hamburger menu button to header on mobile viewports (<768px)
- [x] 5.3 Add backdrop and close-on-navigation behavior for mobile sidebar

## 6. Stub Pages

- [x] 6.1 Create `/transactions` page with `page.tsx` and `page.content.tsx`
- [x] 6.2 Create `/categories` page with `page.tsx` and `page.content.tsx`
- [x] 6.3 Create `/budgets` page with `page.tsx` and `page.content.tsx`
- [x] 6.4 Create `/settings` page under `(settings-layout)` sub-group with `page.tsx` and `page.content.tsx`

## 7. Verification

- [x] 7.1 Verify the app builds without errors (`turbo build`)
- [x] 7.2 Verify all navigation links route correctly and active states work
- [x] 7.3 Verify mobile responsive behavior (sidebar toggle, overlay, close on nav)
