# Money Tracker App — General Overview Plan

## Context

The money-tracker app (`apps/money-tracker`) is a Next.js 16 app with auth already implemented (sign-in, sign-up, verify-email, token-based auth with auto-refresh). The backend API at `localhost:8080` is fully built with endpoints for categories, transactions, recurring transactions, budgets, and analytics — all DTOs are already auto-generated in `packages/shared/src/api/generated/types.gen.ts`. The app needs its core features built out following the user flow: register → onboarding → transactions → dashboard → budgets → recurring → settings.

---

## Build Order

Dependencies require this sequence:

1. **App Shell** — navigation layout for all authenticated `(app-layout)` pages
2. **Categories** — needed by onboarding, transactions, budgets, recurring (lives in settings)
3. **Onboarding** — post-registration flow (currency + categories setup)
4. **Transactions** — core CRUD feature
5. **Dashboard** — analytics widgets consuming transaction data
6. **Budgets** — budget management per category
7. **Recurring Transactions** — scheduled transaction setup
8. **Settings/Cabinet** — separate `(settings-layout)` with profile, categories management, preferences

---

## Phase 0: App Shell

**Goal:** Authenticated layout with navigation for all `(app-layout)` pages.

**Routes:** Wraps all `(app-layout)` group pages via `layout.tsx`

**Files to create:**

```
src/app/[locale]/(app-layout)/layout.tsx
src/app/[locale]/(app-layout)/layout.module.scss
src/app/[locale]/(app-layout)/components/app-navbar/AppNavbar.tsx
src/app/[locale]/(app-layout)/components/app-navbar/AppNavbar.module.scss
src/app/[locale]/(app-layout)/components/user-dropdown/UserDropdown.tsx
```

**What it includes:**

- Top navbar with logo, nav links (Dashboard, Transactions, Budgets, Recurring), user avatar dropdown (Settings, Sign Out)
- Mobile-responsive drawer/sidebar
- Uses existing `Avatar`, `Button` from `@track-my-life/ui`

**i18n:** Add `appShared` namespace for shared nav labels

**New UI components needed:** `Drawer` molecule (mobile nav)

---

## Phase 1: Categories Management

**Goal:** Full CRUD for categories and subcategories (income/expense types with parent-child hierarchy). Lives under settings, also reused in onboarding.

**Routes:**

- `/settings/categories` — list grouped by type with nested subcategories
- Create/edit via modals or inline forms

**API Service** — `CategoryApiService` in `packages/shared/src/api/services/category-api.service.ts`:

- `fetchCategoryList(query)` → GET `/api/transaction-categories`
- `fetchCategoryById(id)` → GET `/api/transaction-categories/{id}`
- `createCategory(body)` → POST `/api/transaction-categories`
- `updateCategory(id, body)` → PATCH `/api/transaction-categories/{id}`
- `deleteCategory(id)` → DELETE `/api/transaction-categories/{id}`

Each service file exports its own pre-configured instance (no central registry in `server-api.ts`).

**Key components:**

- `CategoryTree` — parent categories with expandable subcategories (using `Accordion`)
- `CategoryForm` — react-hook-form + Zod for create/edit
- `CategoryTypeFilter` — INCOME/EXPENSE/ALL toggle
- `DeleteCategoryDialog` — uses existing `AlertDialog`

**Files to create:**

```
src/app/[locale]/(settings-layout)/settings/categories/page.tsx
src/app/[locale]/(settings-layout)/settings/categories/page.content.tsx
src/app/[locale]/(settings-layout)/settings/categories/page.module.scss
src/app/[locale]/(settings-layout)/settings/categories/constants/category-form-schema.ts
src/app/[locale]/(settings-layout)/settings/categories/actions/create-category.ts
src/app/[locale]/(settings-layout)/settings/categories/actions/update-category.ts
src/app/[locale]/(settings-layout)/settings/categories/actions/delete-category.ts
src/app/[locale]/(settings-layout)/settings/categories/components/category-tree/CategoryTree.tsx
src/app/[locale]/(settings-layout)/settings/categories/components/category-form/CategoryForm.tsx
src/app/[locale]/(settings-layout)/settings/categories/components/category-type-filter/CategoryTypeFilter.tsx
src/app/[locale]/(settings-layout)/settings/categories/components/delete-category-dialog/DeleteCategoryDialog.tsx
packages/shared/src/api/services/category-api.service.ts
```

**i18n:** `categoriesPage` namespace already exists — extend as needed

**New UI components needed:** `Checkbox` atom, `Select`/`Combobox` atom

---

## Phase 2: Onboarding Flow

**Goal:** After registration + email verification, guide user through currency selection and default category setup before entering the app.

**Routes:** New `(onboarding-layout)` route group:

- `/onboarding` → redirects to first step
- `/onboarding/currency` — step 1: select default currency
- `/onboarding/categories` — step 2: review/customize preset categories

**Middleware update:** `proxy.ts` must check onboarding completion — if not completed, redirect authenticated users to `/onboarding`

**API Service** — `UserProfileApiService` in `packages/shared/src/api/services/user-profile-api.service.ts`:

- `fetchProfile()` → GET `/api/users/me`
- `updateProfile(body)` → PATCH `/api/users/me`
- `completeOnboarding(body)` → POST `/api/users/me/onboarding`

**Key components:**

- `OnboardingLayout` — layout with step indicator
- `CurrencySelector` — searchable select using `CurrencyCode` type
- `DefaultCategoryList` — checkbox list of preset categories

**Files to create:**

```
src/app/[locale]/(onboarding-layout)/layout.tsx
src/app/[locale]/(onboarding-layout)/onboarding/page.tsx
src/app/[locale]/(onboarding-layout)/onboarding/currency/page.tsx
src/app/[locale]/(onboarding-layout)/onboarding/currency/page.content.tsx
src/app/[locale]/(onboarding-layout)/onboarding/currency/action.ts
src/app/[locale]/(onboarding-layout)/onboarding/categories/page.tsx
src/app/[locale]/(onboarding-layout)/onboarding/categories/page.content.tsx
src/app/[locale]/(onboarding-layout)/onboarding/categories/action.ts
src/app/[locale]/(onboarding-layout)/components/currency-selector/CurrencySelector.tsx
src/app/[locale]/(onboarding-layout)/constants/default-category-list.ts
packages/shared/src/api/services/user-profile-api.service.ts
```

**i18n:** Add `onboardingPage` namespace

**New UI components needed:** `Stepper` molecule

---

## Phase 3: Transactions

**Goal:** Core transaction CRUD with filtering and pagination.

**Routes:**

- `/transactions` — paginated list with filters (date range, type, category, currency)
- `/transactions/create` — create form
- `/transactions/[id]` — detail view
- `/transactions/[id]/edit` — edit form

**API Service** — `TransactionApiService` in `packages/shared/src/api/services/transaction-api.service.ts`:

- `fetchTransactionList(query)` → GET `/api/transactions`
- `fetchTransactionById(id)` → GET `/api/transactions/{id}`
- `createTransaction(body)` → POST `/api/transactions`
- `updateTransaction(id, body)` → PATCH `/api/transactions/{id}`
- `deleteTransaction(id)` → DELETE `/api/transactions/{id}`

**Key components:**

- `TransactionFilterBar` — type, category, date range, currency filters (URL search params)
- `TransactionTable` — data table with pagination
- `TransactionForm` — react-hook-form for create/edit
- `AmountInput` — numeric input with currency formatting
- `CategorySelect` — dropdown filtered by transaction type

**Files to create:**

```
src/app/[locale]/(app-layout)/transactions/page.tsx
src/app/[locale]/(app-layout)/transactions/page.content.tsx
src/app/[locale]/(app-layout)/transactions/page.module.scss
src/app/[locale]/(app-layout)/transactions/create/page.tsx
src/app/[locale]/(app-layout)/transactions/create/page.content.tsx
src/app/[locale]/(app-layout)/transactions/create/action.ts
src/app/[locale]/(app-layout)/transactions/[id]/page.tsx
src/app/[locale]/(app-layout)/transactions/[id]/page.content.tsx
src/app/[locale]/(app-layout)/transactions/[id]/edit/page.tsx
src/app/[locale]/(app-layout)/transactions/[id]/edit/page.content.tsx
src/app/[locale]/(app-layout)/transactions/[id]/edit/action.ts
src/app/[locale]/(app-layout)/transactions/actions/delete-transaction.ts
src/app/[locale]/(app-layout)/transactions/constants/transaction-form-schema.ts
src/app/[locale]/(app-layout)/transactions/components/transaction-filter-bar/TransactionFilterBar.tsx
src/app/[locale]/(app-layout)/transactions/components/transaction-table/TransactionTable.tsx
src/app/[locale]/(app-layout)/transactions/components/transaction-form/TransactionForm.tsx
src/app/[locale]/(app-layout)/transactions/components/amount-input/AmountInput.tsx
src/app/[locale]/(app-layout)/transactions/components/category-select/CategorySelect.tsx
packages/shared/src/api/services/transaction-api.service.ts
```

**i18n:** Add `transactionsPage` namespace

**New UI components needed:** `Table`, `Pagination`, `DatePicker`, `DateRangePicker`, `EmptyState`

---

## Phase 4: Dashboard

**Goal:** Rich overview with statistics, charts, recent transactions, spending breakdowns.

**Route:** `/dashboard` (already exists — populate with widgets)

**API Service** — `TransactionsAnalyticsApiService` in `packages/shared/src/api/services/transactions-analytics-api.service.ts`:

- `fetchSummary(query)` → GET `/api/transactions-analytics/summary`
- `fetchCategoryBreakdown(query)` → GET `/api/transactions-analytics/category-breakdown`
- `fetchTrends(query)` → GET `/api/transactions-analytics/trends`
- `fetchTopCategoryList(query)` → GET `/api/transactions-analytics/top-categories`
- `fetchDailySpending(query)` → GET `/api/transactions-analytics/daily-spending`

**Key components (each as independent Suspense-wrapped widget):**

- `SummaryWidget` — total income, expenses, net balance
- `CategoryBreakdownChart` — pie/donut chart
- `TrendsChart` — line/bar chart (income vs expense over time)
- `TopCategoryList` — ranked spending categories
- `DailySpendingCalendar` — daily spending heatmap/bars
- `RecentTransactionList` — last N transactions (reuses Phase 3 components)
- `DashboardFilterBar` — date range + currency selector
- `WidgetCard` — wrapper with Skeleton loading state

**Files to create:**

```
src/app/[locale]/(app-layout)/dashboard/page.content.tsx              (rewrite)
src/app/[locale]/(app-layout)/dashboard/page.module.scss              (rewrite)
src/app/[locale]/(app-layout)/dashboard/components/summary-widget/SummaryWidget.tsx
src/app/[locale]/(app-layout)/dashboard/components/category-breakdown-chart/CategoryBreakdownChart.tsx
src/app/[locale]/(app-layout)/dashboard/components/trends-chart/TrendsChart.tsx
src/app/[locale]/(app-layout)/dashboard/components/top-category-list/TopCategoryList.tsx
src/app/[locale]/(app-layout)/dashboard/components/recent-transaction-list/RecentTransactionList.tsx
src/app/[locale]/(app-layout)/dashboard/components/dashboard-filter-bar/DashboardFilterBar.tsx
src/app/[locale]/(app-layout)/dashboard/components/widget-card/WidgetCard.tsx
packages/shared/src/api/services/transactions-analytics-api.service.ts
```

**New dependency:** `recharts` for charts

**New UI components needed:** `Skeleton` atom, `Tabs` molecule, `Progress` atom

---

## Phase 5: Budgets

**Goal:** Create and manage budgets per category with progress tracking.

**Routes:**

- `/budgets` — list with progress indicators
- `/budgets/create` — create form
- `/budgets/[id]` — detail with progress + contributing transactions
- `/budgets/[id]/edit` — edit form

**API Service** — `BudgetApiService` in `packages/shared/src/api/services/budget-api.service.ts`:

- `fetchBudgetList(query)` → GET `/api/budgets`
- `fetchBudgetById(id)` → GET `/api/budgets/{id}`
- `createBudget(body)` → POST `/api/budgets`
- `updateBudget(id, body)` → PATCH `/api/budgets/{id}`
- `deleteBudget(id)` → DELETE `/api/budgets/{id}`
- `fetchBudgetProgress(id)` → GET `/api/budgets/{id}/progress`

**Key components:**

- `BudgetCard` — name, amount, period, progress bar, status badge
- `BudgetForm` — category selector, period picker, amount input
- `BudgetProgressBar` — uses `Progress` atom
- `BudgetStatusBadge` — ACTIVE/EXCEEDED using `Badge`

**Files to create:**

```
src/app/[locale]/(app-layout)/budgets/page.tsx
src/app/[locale]/(app-layout)/budgets/page.content.tsx
src/app/[locale]/(app-layout)/budgets/page.module.scss
src/app/[locale]/(app-layout)/budgets/create/page.tsx
src/app/[locale]/(app-layout)/budgets/create/page.content.tsx
src/app/[locale]/(app-layout)/budgets/create/action.ts
src/app/[locale]/(app-layout)/budgets/[id]/page.tsx
src/app/[locale]/(app-layout)/budgets/[id]/page.content.tsx
src/app/[locale]/(app-layout)/budgets/[id]/edit/page.tsx
src/app/[locale]/(app-layout)/budgets/[id]/edit/page.content.tsx
src/app/[locale]/(app-layout)/budgets/[id]/edit/action.ts
src/app/[locale]/(app-layout)/budgets/actions/delete-budget.ts
src/app/[locale]/(app-layout)/budgets/constants/budget-form-schema.ts
src/app/[locale]/(app-layout)/budgets/components/budget-card/BudgetCard.tsx
src/app/[locale]/(app-layout)/budgets/components/budget-form/BudgetForm.tsx
src/app/[locale]/(app-layout)/budgets/components/budget-progress-bar/BudgetProgressBar.tsx
packages/shared/src/api/services/budget-api.service.ts
```

**i18n:** Add `budgetsPage` namespace

---

## Phase 6: Recurring Transactions

**Goal:** Set up transactions that repeat on a schedule (daily/weekly/monthly/yearly).

**Routes:**

- `/recurring-transactions` — list with status
- `/recurring-transactions/create` — create form
- `/recurring-transactions/[id]` — detail with generated transaction history
- `/recurring-transactions/[id]/edit` — edit form

**API Service** — `RecurringTransactionApiService` in `packages/shared/src/api/services/recurring-transaction-api.service.ts`:

- `fetchRecurringTransactionList(query)` → GET `/api/recurring-transactions`
- `fetchRecurringTransactionById(id)` → GET `/api/recurring-transactions/{id}`
- `createRecurringTransaction(body)` → POST `/api/recurring-transactions`
- `updateRecurringTransaction(id, body)` → PATCH `/api/recurring-transactions/{id}`
- `deleteRecurringTransaction(id)` → DELETE `/api/recurring-transactions/{id}`
- `pauseRecurringTransaction(id)` → PATCH `/api/recurring-transactions/{id}/pause`
- `resumeRecurringTransaction(id)` → PATCH `/api/recurring-transactions/{id}/resume`

**Key components:**

- `RecurringTransactionCard` — amount, frequency, next execution, status
- `RecurringTransactionForm` — frequency selector, interval, dates
- `RecurringTransactionStatusBadge` — ACTIVE/PAUSED/CANCELLED using `Badge`
- `FrequencySelect` — DAILY/WEEKLY/MONTHLY/YEARLY dropdown
- `PauseResumeButton` — toggle action

**Files to create:**

```
src/app/[locale]/(app-layout)/recurring-transactions/page.tsx
src/app/[locale]/(app-layout)/recurring-transactions/page.content.tsx
src/app/[locale]/(app-layout)/recurring-transactions/page.module.scss
src/app/[locale]/(app-layout)/recurring-transactions/create/page.tsx
src/app/[locale]/(app-layout)/recurring-transactions/create/page.content.tsx
src/app/[locale]/(app-layout)/recurring-transactions/create/action.ts
src/app/[locale]/(app-layout)/recurring-transactions/[id]/page.tsx
src/app/[locale]/(app-layout)/recurring-transactions/[id]/page.content.tsx
src/app/[locale]/(app-layout)/recurring-transactions/[id]/edit/page.tsx
src/app/[locale]/(app-layout)/recurring-transactions/[id]/edit/page.content.tsx
src/app/[locale]/(app-layout)/recurring-transactions/[id]/edit/action.ts
src/app/[locale]/(app-layout)/recurring-transactions/actions/delete-recurring-transaction.ts
src/app/[locale]/(app-layout)/recurring-transactions/actions/pause-recurring-transaction.ts
src/app/[locale]/(app-layout)/recurring-transactions/actions/resume-recurring-transaction.ts
src/app/[locale]/(app-layout)/recurring-transactions/constants/recurring-transaction-form-schema.ts
src/app/[locale]/(app-layout)/recurring-transactions/components/recurring-transaction-card/RecurringTransactionCard.tsx
src/app/[locale]/(app-layout)/recurring-transactions/components/recurring-transaction-form/RecurringTransactionForm.tsx
src/app/[locale]/(app-layout)/recurring-transactions/components/frequency-select/FrequencySelect.tsx
packages/shared/src/api/services/recurring-transaction-api.service.ts
```

**i18n:** Add `recurringTransactionsPage` namespace

---

## Phase 7: Settings/Cabinet

**Goal:** Centralized settings in a separate `(settings-layout)` route group with its own layout. Includes profile, categories management, and preferences.

**Routes:**

- `/settings` → redirects to `/settings/profile`
- `/settings/profile` — edit name, email, change password
- `/settings/categories` — reuses Phase 1 category components
- `/settings/preferences` — currency, language, theme

**Key components:**

- `SettingsLayout` — sidebar nav + content area (separate from app-layout)
- `SettingsSidebar` — Profile / Categories / Preferences links
- `ProfileForm` — name, email editing
- `PasswordChangeForm` — current + new + confirm password
- `ThemeSelector` — light/dark/system (uses existing `next-themes`)
- `LanguageSelector` — en/uk toggle

**Files to create:**

```
src/app/[locale]/(settings-layout)/layout.tsx
src/app/[locale]/(settings-layout)/layout.module.scss
src/app/[locale]/(settings-layout)/settings/page.tsx
src/app/[locale]/(settings-layout)/settings/profile/page.tsx
src/app/[locale]/(settings-layout)/settings/profile/page.content.tsx
src/app/[locale]/(settings-layout)/settings/profile/action.ts
src/app/[locale]/(settings-layout)/settings/profile/constants/profile-form-schema.ts
src/app/[locale]/(settings-layout)/settings/profile/components/profile-form/ProfileForm.tsx
src/app/[locale]/(settings-layout)/settings/profile/components/password-change-form/PasswordChangeForm.tsx
src/app/[locale]/(settings-layout)/settings/categories/page.tsx          (created in Phase 1)
src/app/[locale]/(settings-layout)/settings/categories/page.content.tsx  (created in Phase 1)
src/app/[locale]/(settings-layout)/settings/preferences/page.tsx
src/app/[locale]/(settings-layout)/settings/preferences/page.content.tsx
src/app/[locale]/(settings-layout)/settings/preferences/action.ts
src/app/[locale]/(settings-layout)/settings/preferences/components/theme-selector/ThemeSelector.tsx
src/app/[locale]/(settings-layout)/settings/preferences/components/language-selector/LanguageSelector.tsx
src/app/[locale]/(settings-layout)/components/settings-sidebar/SettingsSidebar.tsx
```

**i18n:** Add `settingsPage` namespace

---

## Cross-Cutting: New UI Components Needed

| Component           | Type     | Used In                                        |
| ------------------- | -------- | ---------------------------------------------- |
| `Select`/`Combobox` | Atom     | Categories, Onboarding, Transactions, Settings |
| `Checkbox`          | Atom     | Onboarding, Categories                         |
| `Stepper`           | Molecule | Onboarding                                     |
| `Table`             | Molecule | Transactions                                   |
| `Pagination`        | Molecule | Transactions, Budgets, Recurring               |
| `DatePicker`        | Molecule | Transactions, Budgets, Recurring               |
| `DateRangePicker`   | Molecule | Transactions, Dashboard                        |
| `EmptyState`        | Atom     | All list pages                                 |
| `Skeleton`          | Atom     | Dashboard widgets                              |
| `Tabs`              | Molecule | Dashboard, Settings                            |
| `Progress`          | Atom     | Budgets                                        |
| `Drawer`            | Molecule | App Shell mobile nav                           |

## Cross-Cutting: Shared Utilities

Add to `packages/shared/src/utils/`:

- `format-currency.ts` — `formatCurrency(amount, currencyCode, locale)` using `Intl.NumberFormat`
- `format-date.ts` — `formatDate(date, locale)` using `Intl.DateTimeFormat`

## Cross-Cutting: New Dependency

- `recharts` — charting library for dashboard (Phase 4)

## Cross-Cutting: Final PATHS Constant

```typescript
export const PATHS = {
  signIn: '/sign-in',
  signUp: '/sign-up',
  verifyEmail: '/verify-email',
  onboarding: '/onboarding',
  onboardingCurrency: '/onboarding/currency',
  onboardingCategories: '/onboarding/categories',
  dashboard: '/dashboard',
  transactions: '/transactions',
  transactionCreate: '/transactions/create',
  categories: '/categories',
  budgets: '/budgets',
  budgetCreate: '/budgets/create',
  recurringTransactions: '/recurring-transactions',
  recurringTransactionCreate: '/recurring-transactions/create',
  settings: '/settings',
  settingsProfile: '/settings/profile',
  settingsCategories: '/settings/categories',
  settingsPreferences: '/settings/preferences',
} as const;
```

## Cross-Cutting: API Services

Each API service lives in its own file and exports a pre-configured instance directly (no central registry in `server-api.ts`). Each file instantiates the service with base URL and wires up the auth interceptor.

**Service files** in `packages/shared/src/api/services/`:

- `category-api.service.ts` → exports `categoryApiService`
- `user-profile-api.service.ts` → exports `userProfileApiService`
- `transaction-api.service.ts` → exports `transactionApiService`
- `transactions-analytics-api.service.ts` → exports `transactionsAnalyticsApiService`
- `budget-api.service.ts` → exports `budgetApiService`
- `recurring-transaction-api.service.ts` → exports `recurringTransactionApiService`

---

## Verification

For each phase, verify by:

1. `pnpm type-check` — no TypeScript errors
2. `pnpm lint` — passes oxlint
3. `pnpm stylelint` — passes stylelint
4. `pnpm build` — successful production build
5. Manual testing: navigate through the feature flow in browser with backend running
6. i18n: switch between en/uk locales and verify all text renders correctly
