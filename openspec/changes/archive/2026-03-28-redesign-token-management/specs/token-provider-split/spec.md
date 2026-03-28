## ADDED Requirements

### Requirement: ReadOnlyTokenProvider interface provides get-only access to tokens

The system SHALL define a `ReadOnlyTokenProvider` interface with `getAccessToken` and `getRefreshToken` methods that return the current token values without any write capability.

#### Scenario: RSC provider implements ReadOnlyTokenProvider

- **WHEN** `RscTokenProvider` is instantiated
- **THEN** it SHALL implement only `ReadOnlyTokenProvider` and SHALL NOT have `setTokenPair` or `clearTokenPair` methods

#### Scenario: ReadOnlyTokenProvider used in rsc-api setup

- **WHEN** the RSC API client is configured
- **THEN** it SHALL accept a `ReadOnlyTokenProvider` and the TypeScript compiler SHALL reject any attempt to call `setTokenPair` or `clearTokenPair` on it

### Requirement: ReadWriteTokenProvider interface extends ReadOnlyTokenProvider with write access

The system SHALL define a `ReadWriteTokenProvider` interface that extends `ReadOnlyTokenProvider` with `setTokenPair` and `clearTokenPair` methods for persisting and clearing token pairs.

#### Scenario: ServerActionTokenProvider implements ReadWriteTokenProvider

- **WHEN** `ServerActionTokenProvider` is instantiated
- **THEN** it SHALL implement `ReadWriteTokenProvider` with full cookie read/write capability

#### Scenario: MiddlewareTokenProvider implements ReadWriteTokenProvider

- **WHEN** `MiddlewareTokenProvider` is instantiated
- **THEN** it SHALL implement `ReadWriteTokenProvider` with full cookie read/write capability via middleware request/response objects

### Requirement: Type guard distinguishes provider capabilities at runtime

The system SHALL provide a `checkIsReadWriteTokenProvider` function that acts as a TypeScript type guard, returning `true` when the provider has `setTokenPair` and `clearTokenPair` methods.

#### Scenario: Type guard identifies read-write provider

- **WHEN** `checkIsReadWriteTokenProvider` is called with a `ServerActionTokenProvider`
- **THEN** it SHALL return `true` and narrow the type to `ReadWriteTokenProvider`

#### Scenario: Type guard identifies read-only provider

- **WHEN** `checkIsReadWriteTokenProvider` is called with a `RscTokenProvider`
- **THEN** it SHALL return `false`

### Requirement: AuthInterceptor skips refresh for read-only providers

The system SHALL configure `AuthInterceptor` to accept `ReadOnlyTokenProvider | ReadWriteTokenProvider`. When the provider is read-only and a 401 response is received, the interceptor SHALL return the 401 response without attempting token refresh.

#### Scenario: 401 with read-write provider triggers refresh

- **WHEN** a request returns 401 and the provider is `ReadWriteTokenProvider`
- **THEN** the interceptor SHALL attempt token refresh, persist the new tokens, and retry the original request

#### Scenario: 401 with read-only provider returns immediately

- **WHEN** a request returns 401 and the provider is `ReadOnlyTokenProvider`
- **THEN** the interceptor SHALL return the 401 response without attempting any token refresh

#### Scenario: Authorization header injection works for both provider types

- **WHEN** a request is made with either provider type
- **THEN** the interceptor SHALL inject the `Authorization: Bearer {accessToken}` header if an access token is available
