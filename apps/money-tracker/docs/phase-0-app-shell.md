# Phase 0: App Shell — Detailed Plan

## Context

The `(app-layout)` route group currently has only a dashboard page with no shared layout. There is no navbar, sidebar, or user menu. The dashboard page renders a centered card with a logout button. This phase creates the authenticated app shell — a layout with navigation that wraps all main feature pages (dashboard, transactions, budgets, recurring-transactions).

Currently the `(app)` route group (to be renamed `(app-layout)`) has no `layout.tsx` — pages inherit directly from the root `[locale]/layout.tsx`.

---

## What Needs to Happen

1. Rename `(app)` route group to `(app-layout)`
2. Add new UI components to `packages/ui`: `DropdownMenu`, `Sheet` (drawer)
3. Create `(app-layout)/layout.tsx` with navbar
4. Build navbar components: `AppNavbar`, `NavLinkList`, `UserDropdown`, `MobileDrawer`
5. Add `appShared` i18n namespace with nav labels
6. Update `PATHS` with new routes
7. Update dashboard page to remove its own logout button (handled by navbar now)

---

## Step 1: Rename `(app)` → `(app-layout)`

Rename directory:

```
src/app/[locale]/(app)/ → src/app/[locale]/(app-layout)/
```

This is a folder rename only — no code changes needed since route groups don't affect URL paths.

---

## Step 2: New UI Components in `packages/ui`

### 2a: DropdownMenu

Install Radix dependency (existing Radix packages use exact versions):

```
@radix-ui/react-dropdown-menu
```

**File:** `packages/ui/src/components/molecules/dropdown-menu/dropdown-menu.tsx`

Exports:

- `DropdownMenu` (root)
- `DropdownMenuTrigger`
- `DropdownMenuContent`
- `DropdownMenuItem`
- `DropdownMenuSeparator`
- `DropdownMenuLabel`
- `DropdownMenuGroup`

**Style:** `packages/ui/src/components/molecules/dropdown-menu/dropdown-menu.module.scss`

Follow existing Radix component patterns (see `alert-dialog.tsx`, `accordion.tsx`):

- Wrap Radix primitives
- Apply SCSS module classes via `cn()` utility
- Forward refs, spread props
- Use design tokens for spacing, radius, shadows, colors

### 2b: Sheet (Drawer)

Install Radix dependency:

```
@radix-ui/react-dialog
```

**File:** `packages/ui/src/components/molecules/sheet/sheet.tsx`

Exports:

- `Sheet` (root — Radix Dialog.Root)
- `SheetTrigger` (Dialog.Trigger)
- `SheetContent` (Dialog.Portal + Dialog.Overlay + Dialog.Content with slide animation)
- `SheetHeader`
- `SheetTitle` (Dialog.Title)
- `SheetDescription` (Dialog.Description)
- `SheetClose` (Dialog.Close)

**Style:** `packages/ui/src/components/molecules/sheet/sheet.module.scss`

SheetContent supports a `side` prop: `left` | `right` (default: `right`). Uses CSS transform for slide-in animation. Overlay uses semi-transparent backdrop.

### 2c: Update UI package exports

Add to `packages/ui/package.json` exports field:

```json
"./src/components/molecules/dropdown-menu/dropdown-menu": "./src/components/molecules/dropdown-menu/dropdown-menu.tsx",
"./src/components/molecules/sheet/sheet": "./src/components/molecules/sheet/sheet.tsx"
```

---

## Step 3: i18n — Add `appShared` namespace

### 3a: Update namespace constant

**File:** `src/i18n/constants/i18n-namespace.ts`

Add entry:

```typescript
appShared: 'appShared',
```

### 3b: Update file name mapping

**File:** `src/i18n/constants/localization-messages-file-name-by-namespace.ts`

Add mapping:

```typescript
[I18N_NAMESPACE.appShared]: 'app-shared.json',
```

### 3c: Create message files

**File:** `messages/en/app-shared.json`

```json
{
  "navigation": {
    "dashboard": "Dashboard",
    "transactions": "Transactions",
    "budgets": "Budgets",
    "recurringTransactions": "Recurring",
    "settings": "Settings"
  },
  "userMenu": {
    "settings": "Settings",
    "signOut": "Sign out"
  },
  "mobileMenu": {
    "openMenu": "Open menu",
    "closeMenu": "Close menu"
  }
}
```

**File:** `messages/uk/app-shared.json`

```json
{
  "navigation": {
    "dashboard": "Панель",
    "transactions": "Транзакції",
    "budgets": "Бюджети",
    "recurringTransactions": "Повторювані",
    "settings": "Налаштування"
  },
  "userMenu": {
    "settings": "Налаштування",
    "signOut": "Вийти"
  },
  "mobileMenu": {
    "openMenu": "Відкрити меню",
    "closeMenu": "Закрити меню"
  }
}
```

---

## Step 4: Update PATHS

**File:** `src/constants/paths.ts`

Add routes that navbar links will point to:

```typescript
export const PATHS = {
  signIn: '/sign-in',
  signUp: '/sign-up',
  verifyEmail: '/verify-email',
  dashboard: '/dashboard',
  transactions: '/transactions',
  budgets: '/budgets',
  recurringTransactions: '/recurring-transactions',
  settings: '/settings',
} as const;
```

---

## Step 5: Navigation link list constant

**File:** `src/app/[locale]/(app-layout)/constants/nav-link-list.ts`

Define the nav items as a typed constant to be consumed by both desktop navbar and mobile drawer:

```typescript
import { PATHS } from '@/constants/paths';

export const NAV_LINK_LIST = [
  { translationKey: 'navigation.dashboard', href: PATHS.dashboard },
  { translationKey: 'navigation.transactions', href: PATHS.transactions },
  { translationKey: 'navigation.budgets', href: PATHS.budgets },
  { translationKey: 'navigation.recurringTransactions', href: PATHS.recurringTransactions },
] as const;
```

---

## Step 6: App Layout

**File:** `src/app/[locale]/(app-layout)/layout.tsx`

Server Component. Fetches `appShared` translations and passes to the navbar.

```
Structure:
- Async server component
- Gets translations for appShared namespace
- Renders <AppNavbar> + {children}
- No <main> wrapper here — each page defines its own <main>
```

**File:** `src/app/[locale]/(app-layout)/layout.module.scss`

Minimal styles — a flex column container ensuring navbar sits on top and content fills remaining space.

```scss
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
```

---

## Step 7: AppNavbar Component

**File:** `src/app/[locale]/(app-layout)/components/app-navbar/AppNavbar.tsx`

Client component (`'use client'`) — needs `usePathname` for active link detection and interactivity for dropdown/drawer.

```
Structure:
<header>
  <nav>
    [Logo/App name]                    — links to /dashboard
    [Desktop nav links]                — hidden on mobile, visible on desktop (media-l)
    [User dropdown trigger (avatar)]   — hidden on mobile, visible on desktop
    [Mobile menu button (hamburger)]   — visible on mobile, hidden on desktop
  </nav>
</header>
```

Props:

```typescript
interface AppNavbarProps {
  translations: (key: string) => string;
}
```

**File:** `src/app/[locale]/(app-layout)/components/app-navbar/AppNavbar.module.scss`

```scss
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--outline-variant);
  background: var(--surface);
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-3) var(--spacing-4);

  @include media-l {
    gap: var(--spacing-4);
    padding: var(--spacing-3) var(--spacing-6);
  }
}

.logo {
  font-weight: var(--font-weight-bold);
  color: var(--primary);
  text-decoration: none;
}

.desktopNav {
  display: none;

  @include media-l {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
  }
}

.navLink {
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  color: var(--on-surface-variant);
  text-decoration: none;
  font-size: var(--font-body-m-size);
  font-weight: var(--font-weight-medium);
  transition:
    background 0.15s,
    color 0.15s;
}

.navLink:hover {
  background: var(--surface-container);
  color: var(--on-surface);
}

.navLinkActive {
  background: var(--primary-container);
  color: var(--on-primary-container);
}

.spacer {
  flex: 1;
}

.desktopActions {
  display: none;

  @include media-l {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
  }
}

.mobileMenuButton {
  @include media-l {
    display: none;
  }
}
```

### Sub-components

#### NavLinkList

**File:** `src/app/[locale]/(app-layout)/components/app-navbar/components/nav-link-list/NavLinkList.tsx`

Client component. Renders the list of navigation links using `NavigationLink` from `@track-my-life/shared`. Highlights the active link by checking `pathname.startsWith(href)` for nested routes (e.g., `/transactions/create` highlights Transactions).

Props:

```typescript
interface NavLinkListProps {
  translations: (key: string) => string;
  orientation?: 'horizontal' | 'vertical';
  onLinkClick?: () => void;
}
```

- `orientation: 'horizontal'` — flex row for desktop nav
- `orientation: 'vertical'` — flex column for mobile drawer
- `onLinkClick` — called on click, used by mobile drawer to close after navigation

**File:** `src/app/[locale]/(app-layout)/components/app-navbar/components/nav-link-list/NavLinkList.module.scss`

#### UserDropdown

**File:** `src/app/[locale]/(app-layout)/components/app-navbar/components/user-dropdown/UserDropdown.tsx`

Client component. Uses the new `DropdownMenu` from `@track-my-life/ui`.

```
Structure:
<DropdownMenu>
  <DropdownMenuTrigger>
    <Avatar size="sm">
      <AvatarFallback> (first letter of user name or generic icon)
    </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem> Settings → navigates to /settings
    <DropdownMenuSeparator>
    <DropdownMenuItem> Sign out → calls signOut server action via form
  </DropdownMenuContent>
</DropdownMenu>
```

Props:

```typescript
interface UserDropdownProps {
  translations: (key: string) => string;
}
```

Sign-out uses a hidden `<form action={signOut}>` triggered by the dropdown item click, matching the existing pattern in `src/actions/sign-out.ts`.

**File:** `src/app/[locale]/(app-layout)/components/app-navbar/components/user-dropdown/UserDropdown.module.scss`

#### MobileDrawer

**File:** `src/app/[locale]/(app-layout)/components/app-navbar/components/mobile-drawer/MobileDrawer.tsx`

Client component. Uses the new `Sheet` from `@track-my-life/ui`. Only rendered on mobile (hidden via CSS on desktop).

```
Structure:
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" aria-label={translations('mobileMenu.openMenu')}>
      <MenuIcon />  (from lucide-react, already in UI package deps)
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Money Tracker</SheetTitle>
    </SheetHeader>
    <NavLinkList orientation="vertical" onLinkClick={closeDrawer} translations={translations} />
    <Separator />
    <nav>
      Settings link
      Sign out button
    </nav>
  </SheetContent>
</Sheet>
```

Props:

```typescript
interface MobileDrawerProps {
  translations: (key: string) => string;
}
```

Uses `useState` to control open/close. Passes `onLinkClick` to `NavLinkList` to close drawer on navigation.

**File:** `src/app/[locale]/(app-layout)/components/app-navbar/components/mobile-drawer/MobileDrawer.module.scss`

---

## Step 8: Update Dashboard Page

**File:** `src/app/[locale]/(app-layout)/dashboard/page.content.tsx`

Remove the sign-out button and card wrapper — the navbar now handles sign-out. Replace with a simple placeholder that will be expanded in Phase 4 (Dashboard).

```tsx
<main className={styles.main}>
  <Typography variant="title-l">{translations('content.title')}</Typography>
</main>
```

**File:** `src/app/[locale]/(app-layout)/dashboard/page.module.scss`

Simplify to just the main content area padding:

```scss
.main {
  padding: var(--spacing-4);

  @include media-l {
    padding: var(--spacing-6);
  }
}
```

---

## File Tree Summary

### New files

```
packages/ui/src/components/molecules/dropdown-menu/dropdown-menu.tsx
packages/ui/src/components/molecules/dropdown-menu/dropdown-menu.module.scss
packages/ui/src/components/molecules/sheet/sheet.tsx
packages/ui/src/components/molecules/sheet/sheet.module.scss
src/app/[locale]/(app-layout)/layout.tsx
src/app/[locale]/(app-layout)/layout.module.scss
src/app/[locale]/(app-layout)/constants/nav-link-list.ts
src/app/[locale]/(app-layout)/components/app-navbar/AppNavbar.tsx
src/app/[locale]/(app-layout)/components/app-navbar/AppNavbar.module.scss
src/app/[locale]/(app-layout)/components/app-navbar/components/nav-link-list/NavLinkList.tsx
src/app/[locale]/(app-layout)/components/app-navbar/components/nav-link-list/NavLinkList.module.scss
src/app/[locale]/(app-layout)/components/app-navbar/components/user-dropdown/UserDropdown.tsx
src/app/[locale]/(app-layout)/components/app-navbar/components/user-dropdown/UserDropdown.module.scss
src/app/[locale]/(app-layout)/components/app-navbar/components/mobile-drawer/MobileDrawer.tsx
src/app/[locale]/(app-layout)/components/app-navbar/components/mobile-drawer/MobileDrawer.module.scss
messages/en/app-shared.json
messages/uk/app-shared.json
```

### Modified files

```
packages/ui/package.json                                    (add radix deps + exports)
src/app/[locale]/(app) → (app-layout)/                     (rename directory)
src/app/[locale]/(app-layout)/dashboard/page.content.tsx    (remove sign-out, simplify)
src/app/[locale]/(app-layout)/dashboard/page.module.scss    (simplify styles)
src/constants/paths.ts                                      (add new routes)
src/i18n/constants/i18n-namespace.ts                        (add appShared)
src/i18n/constants/localization-messages-file-name-by-namespace.ts  (add mapping)
```

---

## Implementation Order

1. Install Radix deps + create `DropdownMenu` and `Sheet` in UI package
2. Rename `(app)` → `(app-layout)`
3. Add `appShared` i18n namespace + message files (en/uk)
4. Update `PATHS` constant
5. Create `nav-link-list.ts` constant
6. Create `layout.tsx` + `layout.module.scss`
7. Create `AppNavbar` with sub-components (`NavLinkList`, `UserDropdown`, `MobileDrawer`)
8. Update dashboard page (remove sign-out card, simplify)

---

## Verification

1. `pnpm type-check` — no TypeScript errors across monorepo
2. `pnpm lint` — passes oxlint
3. `pnpm stylelint` — passes stylelint
4. `pnpm build` — successful production build
5. Manual testing:
   - Desktop: navbar visible with logo, nav links, user avatar dropdown
   - Nav links highlight correctly based on current route
   - User dropdown opens with Settings and Sign out options
   - Sign out works (redirects to sign-in, clears tokens)
   - Settings link navigates to /settings (will 404 until Phase 7, acceptable)
   - Mobile: hamburger button visible, opens left-side drawer with nav links
   - Drawer closes on link click and navigates correctly
   - Responsive: navbar transitions cleanly between mobile/desktop at `breakpoint-l` (1024px)
6. i18n: switch between en/uk and verify all nav labels render in correct language
7. Theme: toggle light/dark and verify navbar colors update correctly
