## Context

The backend now exposes `GET /api/transactions/export` that returns a file (CSV or JSON) based on query parameters (`format`, `categoryId`, `dateFrom`, `dateTo`). The frontend needs to integrate this endpoint so users can download their transactions from two pages:

1. **Transactions list page** — download all transactions, or only those matching the current date range
2. **Transactions by category detail page** — download transactions for a specific category

The existing `ApiClient` only supports JSON response parsing. The export endpoint returns binary file data with `Content-Disposition` headers.

## Goals / Non-Goals

**Goals:**

- Allow users to download transactions as CSV or JSON from both transaction pages
- Support passing current page filters (date range, category) to the export endpoint
- Provide a clean UX with format selection (dropdown or menu)

**Non-Goals:**

- Background/async export for large datasets — the backend handles this synchronously
- Export from other pages (analytics, dashboard)
- Custom column selection or export templates

## Decisions

### 1. Add `requestBlob` method to `ApiClient`

The existing `request<TData>` method parses JSON. Export returns a file blob. Add a new `protected requestBlob(options)` method that returns `{ blob, error, response }` instead of parsing JSON. This keeps the existing request flow (interceptors, URL building) while handling non-JSON responses.

**Alternative considered:** Making `request` generic enough to handle both — rejected because it would complicate the type signature and parsing logic for all callers.

### 2. Client-side download via `ExportTransactionButton` client component

The download needs to be triggered from the browser (to initiate a file save dialog). This means the actual fetch must happen client-side, not in a server action. The flow:

1. User clicks export button → selects format (CSV/JSON)
2. Client component calls `fetch` directly to the API via a client-side API service instance
3. Response blob is converted to a download URL via `URL.createObjectURL`
4. A temporary `<a>` element triggers the download

**Alternative considered:** Server action that returns a base64-encoded string — rejected because it doubles memory usage and doesn't work well with large files.

### 3. Use `DropdownMenu` for format selection

Place a single "Export" button that opens a dropdown with "Download CSV" and "Download JSON" options. This keeps the header clean with one button instead of two.

### 4. Client-side API service for export

Create a browser-side API service instance (no SSR auth cookie forwarding needed since the browser sends cookies automatically). This service is used only by the export button component.

### 5. Pass filters as query parameters

- **Transactions page:** Pass `dateFrom`, `dateTo`, and `format` from current URL search params
- **By-category page:** Pass `categoryId` and `format`

## Risks / Trade-offs

- **[Large exports may be slow]** → The button should show a loading state while the download is in progress. No timeout handling needed since the browser manages this.
- **[Client-side fetch bypasses RSC caching]** → Acceptable since exports are one-off downloads, not repeated data fetches.
- **[New `requestBlob` method adds surface area to ApiClient]** → Minimal risk; it follows the same interceptor pattern as existing methods and is a natural extension.
