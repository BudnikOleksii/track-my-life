## ADDED Requirements

### Requirement: API client supports blob responses

The `ApiClient` class SHALL expose a `requestBlob` method that performs a fetch using the same interceptor pipeline as `request`, but returns `{ blob, error, response }` where `blob` is a `Blob` object from the response body.

#### Scenario: Successful blob download

- **WHEN** `requestBlob` is called with valid options and the server returns a 2xx response with binary content
- **THEN** the method SHALL return `{ blob: <Blob>, error: null, response }`

#### Scenario: Failed blob download

- **WHEN** `requestBlob` is called and the server returns a non-2xx response
- **THEN** the method SHALL return `{ blob: null, error: <ProblemDetailsDto>, response }`

### Requirement: TransactionApiService has export method

The `TransactionApiService` SHALL expose an `exportTransactionList(query)` method that calls `GET /api/transactions/export` with optional query parameters (`format`, `categoryId`, `dateFrom`, `dateTo`) and returns a blob response.

#### Scenario: Export all transactions as CSV

- **WHEN** `exportTransactionList({ format: 'csv' })` is called
- **THEN** the service SHALL send `GET /api/transactions/export?format=csv` and return the file blob

#### Scenario: Export transactions for a category as JSON

- **WHEN** `exportTransactionList({ format: 'json', categoryId: '123' })` is called
- **THEN** the service SHALL send `GET /api/transactions/export?format=json&categoryId=123` and return the file blob

#### Scenario: Export transactions for a date range

- **WHEN** `exportTransactionList({ format: 'csv', dateFrom: '2024-05-01', dateTo: '2024-05-31' })` is called
- **THEN** the service SHALL send `GET /api/transactions/export?format=csv&dateFrom=2024-05-01&dateTo=2024-05-31` and return the file blob

### Requirement: Transactions page has export button

The transactions list page SHALL display an export button in the page header that allows users to download transactions in CSV or JSON format.

#### Scenario: Export all transactions

- **WHEN** the user is on the transactions page with no date filters active and clicks "Download CSV" or "Download JSON"
- **THEN** the system SHALL call the export endpoint with only the `format` parameter and trigger a file download

#### Scenario: Export filtered transactions by date range

- **WHEN** the user is on the transactions page with `dateFrom` and `dateTo` search params active and clicks an export option
- **THEN** the system SHALL call the export endpoint with `format`, `dateFrom`, and `dateTo` parameters and trigger a file download

#### Scenario: Loading state during export

- **WHEN** the export request is in progress
- **THEN** the export button SHALL display a loading indicator and be disabled

### Requirement: By-category detail page has export button

The transactions by category detail page SHALL display an export button in the page header that allows users to download transactions for that category.

#### Scenario: Export category transactions

- **WHEN** the user is viewing transactions for a specific category and clicks an export option
- **THEN** the system SHALL call the export endpoint with `format` and `categoryId` parameters and trigger a file download

#### Scenario: Loading state during category export

- **WHEN** the category export request is in progress
- **THEN** the export button SHALL display a loading indicator and be disabled

### Requirement: Export button uses dropdown for format selection

The export button SHALL use a `DropdownMenu` component that displays two options: "Download CSV" and "Download JSON".

#### Scenario: User selects CSV format

- **WHEN** the user clicks the export button and selects "Download CSV"
- **THEN** the system SHALL initiate a download with `format=csv`

#### Scenario: User selects JSON format

- **WHEN** the user clicks the export button and selects "Download JSON"
- **THEN** the system SHALL initiate a download with `format=json`

### Requirement: Browser file download from blob

A utility function SHALL convert a blob response into a browser file download using `URL.createObjectURL` and a temporary anchor element.

#### Scenario: Trigger download with filename from Content-Disposition

- **WHEN** the blob response includes a `Content-Disposition` header with a filename
- **THEN** the download SHALL use that filename

#### Scenario: Trigger download with fallback filename

- **WHEN** the blob response does not include a `Content-Disposition` header
- **THEN** the download SHALL use a fallback filename like `transactions.csv` or `transactions.json` based on the format

### Requirement: i18n support for export labels

Translation keys SHALL be added for export-related labels in both `transactionsPage` and `transactionsByCategoryPage` namespaces.

#### Scenario: Translations available in English

- **WHEN** the locale is English
- **THEN** the export button and dropdown options SHALL display translated labels (e.g., "Export", "Download CSV", "Download JSON")

#### Scenario: Translations available in Ukrainian

- **WHEN** the locale is Ukrainian
- **THEN** the export button and dropdown options SHALL display Ukrainian translations
