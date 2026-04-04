## 1. API Types Generation

- [x] 1.1 Run `pnpm generate:api` from `packages/shared` to generate types from the new export endpoint
- [x] 1.2 Run `pnpm fmt` from root to format generated files

## 2. ApiClient Blob Support

- [x] 2.1 Add `requestBlob` method to `ApiClient` (`packages/shared/src/api/client/api-client.ts`) that returns `{ blob, error, response }` using the same interceptor pipeline
- [x] 2.2 Add `BlobResponse` type to `packages/shared/src/api/client/types.ts`

## 3. TransactionApiService Export Method

- [x] 3.1 Add `exportTransactionList(query)` method to `TransactionApiService` that calls `GET /api/transactions/export` with optional `format`, `categoryId`, `dateFrom`, `dateTo` query params and returns a blob response

## 4. Client-Side API Service

- [x] 4.1 Create Next.js API route handler (`app/api/transactions/export/route.ts`) that proxies export requests to the backend with auth cookie forwarding

## 5. Download Utility

- [x] 5.1 Create `downloadBlob` utility function that extracts filename from `Content-Disposition` header (with fallback) and triggers a browser file download via `URL.createObjectURL` and a temporary anchor element

## 6. ExportTransactionButton Component

- [x] 6.1 Create `ExportTransactionButton` client component (`'use client'`) with a `DropdownMenu` trigger showing "Export" and two options: "Download CSV" and "Download JSON"
- [x] 6.2 Accept props: optional `categoryId`, optional `dateFrom`, optional `dateTo` to pass as query params to the export endpoint
- [x] 6.3 Implement loading state (disable button, show spinner) while download is in progress
- [x] 6.4 Call the client-side API service, get blob, and use `downloadBlob` utility to trigger the download

## 7. Integrate on Transactions Page

- [x] 7.1 Add `ExportTransactionButton` to the transactions page header, passing `dateFrom` and `dateTo` from parsed search params
- [x] 7.2 Add i18n translation keys for export labels in `transactionsPage` namespace (en and uk)

## 8. Integrate on By-Category Detail Page

- [x] 8.1 Add `ExportTransactionButton` to the by-category detail page header, passing `categoryId`
- [x] 8.2 Add i18n translation keys for export labels in `transactionsByCategoryPage` namespace (en and uk)

## 9. Verify

- [x] 9.1 Run `pnpm type-check` to ensure no type errors
- [x] 9.2 Run `pnpm lint` and `pnpm fmt:check` to ensure code quality
