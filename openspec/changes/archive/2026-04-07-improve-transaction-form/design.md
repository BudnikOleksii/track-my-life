## Context

The transaction form (`TransactionFormPage.tsx`) currently uses:

- A `Select` dropdown for transaction type (INCOME/EXPENSE)
- A flat `Combobox` for category selection (no parent/child hierarchy)
- A read-only `Input` for currency code (redundant since multi-currency is not supported)
- A native `date` input (no time selection)

The form is used by both create (`/transactions/create`) and edit (`/transactions/[id]/edit`) pages. Categories have a `parentCategoryId` field supporting one level of nesting. The API already accepts ISO datetime strings with time components.

## Goals / Non-Goals

**Goals:**

- Faster transaction entry with visible type radio buttons
- Intuitive hierarchical category selection (parent → subcategory)
- Date + time capture in a single form row
- Cleaner amount field with inline currency display
- Reusable `TimePicker` and `RadioGroup` components in `packages/ui`

**Non-Goals:**

- Multi-currency support or currency conversion
- Deep category nesting (only one level: parent → child)
- Calendar/datepicker popup replacement (keep native date input for now)
- Transfer transaction type (only Income/Expense for now)

## Decisions

### 1. RadioGroup component via Radix UI

Use `@radix-ui/react-radio-group` as the base for `packages/ui/src/components/atoms/radio-group/`. This matches the existing pattern (Radix primitives for all UI atoms). Style as pill/segment buttons matching the screenshot design — outlined pills with the selected one having a colored border and text.

**Alternative considered**: Custom toggle buttons without Radix — rejected because Radix provides proper aria roles, keyboard navigation, and focus management out of the box.

### 2. Amount field with currency prefix

Instead of a separate currency field, render the user's `baseCurrencyCode` symbol as a static prefix inside the `Input` component. Use a `startAdornment` pattern — a `<span>` positioned inside the input with left padding to accommodate it. The `currencyCode` field is removed from the form schema and injected directly in the server action from the user's profile.

**Alternative considered**: Using `Intl.NumberFormat` with currency formatting — rejected as overly complex for a simple prefix display.

### 3. Two-panel category picker

Build a `CategoryPicker` component specific to the money-tracker app (in `transactions/components/`), not in `packages/ui`, since it's tightly coupled to the `CategoryResponseDto` shape and transaction domain logic.

Layout:

- Left column: main categories (`parentCategoryId === null`) filtered by selected transaction type, with emoji/icon and name
- Right column: subcategories of the currently hovered/selected main category
- Selecting a main category with no subcategories sets `categoryId` to that category
- Selecting a subcategory sets `categoryId` to the subcategory
- The picker renders inline below the category field (expandable panel), not as a modal/dialog

Data flow: the existing `categoryList` prop already contains all categories (flat list with `parentCategoryId`). The component groups them client-side using `useMemo`.

### 4. TimePicker in packages/ui

Create `packages/ui/src/components/atoms/time-picker/` with:

- Two native `<input type="number">` fields for hours (0-23) and minutes (0-59) separated by a colon
- Simple shadcn-style design: bordered inputs, arrow key increment/decrement
- Props: `value: { hours: number; minutes: number }`, `onChange`, `disabled`
- No external dependencies beyond React

The date field in the transaction form becomes a row with the native date input + the new TimePicker side by side. Default to current local date and time.

**Alternative considered**: Single `<input type="time">` — rejected because browser implementations vary significantly and offer poor styling control.

### 5. Form schema changes

Updated `transactionFormSchema`:

- Remove `currencyCode` (injected server-side)
- Add `time` field as `z.string().regex(/^\d{2}:\d{2}$/)` (HH:mm format)
- Keep `date` as `z.string()` (YYYY-MM-DD format)
- In the submit handler, combine `date` + `time` into a single ISO datetime before calling the server action

### 6. Server action currency injection

Both `createTransaction` and `updateTransaction` server actions will fetch the user's profile to get `baseCurrencyCode` and inject it into the request body. This removes the client from needing to know or send the currency.

## Risks / Trade-offs

- **Category picker complexity**: The two-panel layout adds UI complexity. Mitigated by keeping it as a simple expandable inline panel rather than a modal, and only supporting one level of nesting.
- **Time picker UX on mobile**: Number inputs for hours/minutes may be less ergonomic on mobile than native time pickers. Mitigated by using `inputMode="numeric"` and proper touch target sizing. Can revisit with a native fallback later.
- **Currency injection in server actions**: Adding a profile fetch to every transaction mutation adds a small latency cost. Mitigated by the profile being cached and typically fast to retrieve.
