## Context

Users currently create transactions one at a time via the form UI. The app has no file upload or bulk import capability. The backend will expose a `POST /api/transactions/import` endpoint that accepts an array of transaction objects. The import data format comes from external tracker exports as JSON or CSV with fields: Date, Category, Type, Amount, Currency, and optional Subcategory.

The existing `TransactionApiService` in `packages/shared` provides CRUD operations via `ApiClient`. The app uses Next.js server actions for mutations with `revalidatePath`/`revalidateTag` for cache invalidation.

## Goals / Non-Goals

**Goals:**

- Allow users to upload JSON or CSV files and preview parsed rows before importing
- Validate each row client-side and clearly indicate valid/invalid rows with error details
- Submit valid rows to `POST /api/transactions/import` via the existing API client pattern
- Integrate naturally into the existing transaction navigation (sidebar submenu)

**Non-Goals:**

- Drag-and-drop file upload (use standard file input; drag-and-drop can be added later)
- Editing individual rows before import (out of scope — user fixes the file and re-uploads)
- Mapping arbitrary column names (fixed schema: Date, Category, Type, Amount, Currency, Subcategory)
- Streaming/chunked upload for very large files
- CSV export functionality

## Decisions

### 1. Client-side file parsing

Parse JSON and CSV entirely in the browser before sending structured data to the API.

**Rationale:** The import endpoint accepts JSON, not file uploads. Client-side parsing gives instant validation feedback and avoids multipart form handling. File sizes are small (hundreds of rows at most).

**Alternative considered:** Server-side parsing via FormData upload — rejected because it adds unnecessary complexity and delays feedback.

### 2. CSV parsing with `papaparse`

Use the `papaparse` library for CSV parsing.

**Rationale:** CSV parsing has edge cases (quoted fields, escaped commas, BOM handling, encoding). `papaparse` is battle-tested (47k+ GitHub stars), has zero dependencies, supports browser environments, and handles header row mapping. Writing a custom parser would be error-prone.

**Alternative considered:** Custom inline CSV parser — rejected due to edge case complexity.

### 3. Zod schema for row validation

Define a `importRowSchema` Zod schema that validates each parsed row. The schema validates the raw import format (Date as string with expected pattern, Type as case-insensitive Expense/Income, Amount as number, etc.). A separate `convertImportRow` function transforms valid rows into the shape expected by the import API.

**Rationale:** Consistent with the existing form validation pattern (Zod + react-hook-form). Gives per-field error messages for each row.

### 4. New page route at `/transactions/import`

Add the import page under the existing transactions route group at `apps/money-tracker/src/app/[locale]/(app-layout)/transactions/import/page.tsx`.

**Rationale:** Follows the existing route structure. The import page is a transaction-related action alongside create/edit.

### 5. Import page as a client component with no server-side data fetching

The import page is purely client-side: file selection, parsing, validation, and preview all happen in the browser. The only server interaction is the final import API call via a server action.

**Rationale:** No server data is needed to render the page (unlike create/edit which need categories). This keeps the page simple and fast.

### 6. Add import link to sidebar transactions submenu

Add an "Import" item to the transactions submenu in the sidebar, alongside "By Date", "By Category", and "Recurring".

**Rationale:** Discoverable location consistent with existing navigation patterns.

## Risks / Trade-offs

- **[Large file performance]** → Parsing thousands of rows in the browser could be slow. Mitigation: warn users above a row count threshold (e.g., 1000 rows). Acceptable trade-off given the target use case.
- **[Category name mismatch]** → Imported data uses category names (e.g., "Транспорт") but the API expects `categoryId`. Mitigation: the backend import endpoint handles name-to-ID resolution. The frontend sends category names as-is.
- **[Partial import failure]** → Some rows may fail server-side even if client validation passes. Mitigation: display the API error response and let the user know which rows failed, if the backend provides that detail.
- **[CSV encoding issues]** → Files may use different encodings. Mitigation: `papaparse` handles UTF-8 and common encodings; document that UTF-8 is expected.
