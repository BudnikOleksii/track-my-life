## ADDED Requirements

### Requirement: File upload accepts JSON and CSV formats

The system SHALL accept file uploads with `.json` and `.csv` extensions. The system SHALL reject files with other extensions and display an error message indicating accepted formats.

#### Scenario: Valid JSON file selected

- **WHEN** user selects a `.json` file via the file input
- **THEN** system parses the file and displays parsed rows in the preview table

#### Scenario: Valid CSV file selected

- **WHEN** user selects a `.csv` file via the file input
- **THEN** system parses the CSV (with header row) and displays parsed rows in the preview table

#### Scenario: Unsupported file type selected

- **WHEN** user selects a file that is not `.json` or `.csv`
- **THEN** system displays an error message indicating only JSON and CSV files are accepted

#### Scenario: Invalid JSON content

- **WHEN** user selects a `.json` file that contains malformed JSON
- **THEN** system displays an error message indicating the file could not be parsed

#### Scenario: Empty file selected

- **WHEN** user selects a file with no data rows
- **THEN** system displays an error message indicating the file contains no transactions

### Requirement: Client-side row validation with per-row error display

The system SHALL validate each parsed row against the expected schema: Date (string), Category (string, required), Type (Expense or Income, case-insensitive), Amount (positive number), Currency (string, required). Subcategory is optional. Each invalid row SHALL display the specific validation errors for that row.

#### Scenario: All rows valid

- **WHEN** file is parsed and all rows pass validation
- **THEN** all rows display with a valid indicator and the import button is enabled

#### Scenario: Some rows invalid

- **WHEN** file is parsed and some rows fail validation
- **THEN** invalid rows display with an error indicator and per-field error messages
- **THEN** valid rows display with a valid indicator
- **THEN** the import button is enabled (imports only valid rows)

#### Scenario: All rows invalid

- **WHEN** file is parsed and no rows pass validation
- **THEN** all rows display with error indicators and per-field error messages
- **THEN** the import button is disabled

#### Scenario: Missing required field

- **WHEN** a row is missing Category, Type, Amount, or Currency
- **THEN** that row displays as invalid with an error message specifying the missing field

#### Scenario: Invalid transaction type

- **WHEN** a row has a Type value that is not "Expense" or "Income" (case-insensitive)
- **THEN** that row displays as invalid with an error message about invalid type

#### Scenario: Invalid amount

- **WHEN** a row has a non-numeric or negative Amount
- **THEN** that row displays as invalid with an error message about invalid amount

### Requirement: Preview table displays parsed rows with status

The system SHALL display a table showing all parsed rows with columns: row number, Date, Category, Type, Amount, Currency, and Status (valid/invalid). Invalid rows SHALL show expandable or inline error details.

#### Scenario: Preview table rendering

- **WHEN** file parsing and validation complete
- **THEN** system displays a table with all rows, valid rows marked with a success indicator, invalid rows marked with an error indicator and error details

#### Scenario: Row count summary

- **WHEN** file parsing and validation complete
- **THEN** system displays a summary showing total rows, valid count, and invalid count

### Requirement: Import valid rows via API

The system SHALL send all valid rows to `POST /api/transactions/import` when the user clicks the import button. The system SHALL display a success message with the count of imported transactions on success, or an error message on failure.

#### Scenario: Successful import

- **WHEN** user clicks the import button and the API returns success
- **THEN** system displays a success toast with the count of imported transactions
- **THEN** system redirects to the transactions list page

#### Scenario: Import API error

- **WHEN** user clicks the import button and the API returns an error
- **THEN** system displays an error message from the API response

#### Scenario: Import button disabled during submission

- **WHEN** user clicks the import button
- **THEN** the import button is disabled and shows a loading state until the API responds

### Requirement: Navigation entry in sidebar

The system SHALL add an "Import" item to the transactions submenu in the sidebar navigation, linking to `/transactions/import`.

#### Scenario: Sidebar shows import link

- **WHEN** user views the sidebar with transactions submenu expanded
- **THEN** an "Import" navigation item is visible linking to `/transactions/import`

### Requirement: Import page accessible at /transactions/import

The system SHALL render the import page at the `/transactions/import` route within the app layout, with proper page title and breadcrumb.

#### Scenario: Direct navigation to import page

- **WHEN** user navigates to `/transactions/import`
- **THEN** system renders the import page with file upload input and instructions

### Requirement: API service method for transaction import

The `TransactionApiService` SHALL expose an `importTransactionList` method that sends a POST request to `/api/transactions/import` with the array of valid transaction rows.

#### Scenario: Service method sends correct request

- **WHEN** `importTransactionList` is called with an array of transaction data
- **THEN** it sends a POST request to `/api/transactions/import` with the data as the request body

### Requirement: i18n support for all import UI text

All user-facing text on the import page SHALL use `next-intl` translation keys. Both English and Ukrainian translations SHALL be provided.

#### Scenario: English locale

- **WHEN** user views the import page in English
- **THEN** all labels, messages, and errors are displayed in English

#### Scenario: Ukrainian locale

- **WHEN** user views the import page in Ukrainian
- **THEN** all labels, messages, and errors are displayed in Ukrainian
