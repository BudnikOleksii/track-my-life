## 1. Route restructuring

- [x] 1.1 Update `PATHS` in `apps/money-tracker/src/constants/paths.ts` — change `recurringTransactions` from `/recurring-transactions` to `/transactions/recurring` and update all derived path helpers (`getRecurringTransactionsDetailPath`, `getRecurringTransactionsEditPath`, etc.)
- [x] 1.2 Move the `apps/money-tracker/src/app/[locale]/(app-layout)/recurring-transactions/` folder to `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/recurring/`
- [x] 1.3 Search and update all imports/references to the old `recurring-transactions` path across the codebase (actions, components, links, breadcrumbs)

## 2. Navigation data structure

- [x] 2.1 Extend `NavigationItem` interface in `AppSidebar.tsx` with optional `children?: NavigationItem[]` field
- [x] 2.2 Refactor `NAVIGATION_ITEM_LIST` to make Transactions a parent item with three children: By Date (`/transactions`, CalendarDays icon), By Category (`/transactions/by-category`, LayoutList icon), Recurring (`/transactions/recurring`, Repeat icon)

## 3. Active state logic

- [x] 3.1 Replace `checkIsActive` with a longest-match strategy that flattens all items (parents without children + all children), filters by prefix match, and picks the longest `href`
- [x] 3.2 Verify no double-active state occurs when visiting `/transactions`, `/transactions/by-category`, `/transactions/recurring`, or their sub-routes

## 4. Collapsible submenu UI

- [x] 4.1 Add `openSubmenuList` state (useState set) to track which parent submenus are expanded
- [x] 4.2 Implement auto-expand logic: when a child route is active, its parent submenu opens automatically
- [x] 4.3 Render parent items with children as a button (not a link) with a chevron indicator (ChevronDown/ChevronRight) that toggles the submenu
- [x] 4.4 Render child items as indented `NavigationLink` components below the parent when submenu is expanded
- [x] 4.5 Hide submenu children and chevron when sidebar is collapsed (`isCollapsed` is true)
- [x] 4.6 Close mobile sidebar on child link click (call `onCloseMobile`)

## 5. Styling

- [x] 5.1 Add SCSS styles in `AppSidebar.module.scss` for submenu parent button (match existing navItem style plus chevron layout)
- [x] 5.2 Add SCSS styles for child items with left indent to show hierarchy
- [x] 5.3 Add chevron rotation/transition styles for expand/collapse indicator

## 6. Translations

- [x] 6.1 Update `apps/money-tracker/messages/en/navigation.json` — add `transactionsByDate` key ("By Date"), keep existing keys, adjust if needed
- [x] 6.2 Update `apps/money-tracker/messages/uk/navigation.json` — add Ukrainian translation for `transactionsByDate` and verify other transaction-related keys

## 7. Verification

- [x] 7.1 Run `pnpm type-check` and fix any TypeScript errors
- [x] 7.2 Run `pnpm lint` and `pnpm stylelint` and fix any lint issues
- [x] 7.3 Run `pnpm build` and confirm successful build
