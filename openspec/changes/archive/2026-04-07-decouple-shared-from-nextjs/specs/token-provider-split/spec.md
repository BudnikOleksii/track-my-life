## MODIFIED Requirements

### Requirement: MiddlewareTokenProvider implements ReadWriteTokenProvider

`MiddlewareTokenProvider` SHALL implement `ReadWriteTokenProvider` with full cookie read/write capability via middleware request/response objects. It SHALL be imported from `@track-my-life/next-shared` instead of `@track-my-life/shared`.

#### Scenario: MiddlewareTokenProvider is instantiated

- **WHEN** `MiddlewareTokenProvider` is instantiated
- **THEN** it SHALL implement `ReadWriteTokenProvider` with full cookie read/write capability via middleware request/response objects

#### Scenario: MiddlewareTokenProvider import source

- **WHEN** middleware code imports `MiddlewareTokenProvider`
- **THEN** the import source SHALL be `@track-my-life/next-shared`, not `@track-my-life/shared`

### Requirement: Token provider interfaces and BrowserTokenProvider stay in shared

The `ReadWriteTokenProvider` and `ReadOnlyTokenProvider` interfaces, along with `BrowserTokenProvider`, SHALL remain in `@track-my-life/shared` as they have no Next.js dependencies.

#### Scenario: BrowserTokenProvider unchanged

- **WHEN** code imports `BrowserTokenProvider`, `ReadWriteTokenProvider`, or `ReadOnlyTokenProvider`
- **THEN** the import source SHALL remain `@track-my-life/shared`

### Requirement: RscTokenProvider and ServerActionTokenProvider move to next-shared

`RscTokenProvider` and `ServerActionTokenProvider` SHALL be imported from `@track-my-life/next-shared` instead of `@track-my-life/shared` because they use dynamic `import('next/headers')`.

#### Scenario: RscTokenProvider import source

- **WHEN** code imports `RscTokenProvider`
- **THEN** the import source SHALL be `@track-my-life/next-shared`, not `@track-my-life/shared`

#### Scenario: ServerActionTokenProvider import source

- **WHEN** code imports `ServerActionTokenProvider`
- **THEN** the import source SHALL be `@track-my-life/next-shared`, not `@track-my-life/shared`
