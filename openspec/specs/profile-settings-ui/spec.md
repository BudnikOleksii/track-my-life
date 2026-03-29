## ADDED Requirements

### Requirement: Settings page displays profile information

The settings page SHALL fetch the user's profile data via RSC and display it in an editable profile form section.

#### Scenario: Profile data loaded successfully

- **WHEN** the user navigates to `/settings`
- **THEN** the page SHALL display the profile form pre-filled with the user's firstName, lastName, countryCode, and baseCurrencyCode

#### Scenario: Profile data loading state

- **WHEN** the profile data is being fetched
- **THEN** the page SHALL display skeleton placeholders for the form fields

### Requirement: Profile edit form

The system SHALL provide a form to edit profile fields (firstName, lastName, countryCode, baseCurrencyCode) with validation using zod and react-hook-form.

#### Scenario: Successful profile update

- **WHEN** the user modifies profile fields and submits the form
- **THEN** the system SHALL call the update profile server action and display a success toast

#### Scenario: Validation error on profile form

- **WHEN** the user submits invalid data (e.g., empty required fields)
- **THEN** the form SHALL display field-level validation errors without submitting

#### Scenario: Country and currency selection

- **WHEN** the user interacts with countryCode or baseCurrencyCode fields
- **THEN** the system SHALL present a searchable Combobox with available options

### Requirement: Change password form

The system SHALL provide a password change form with fields for current password and new password.

#### Scenario: Successful password change

- **WHEN** the user enters valid current and new passwords and submits
- **THEN** the system SHALL call the change password server action and display a success toast

#### Scenario: Invalid current password

- **WHEN** the user submits with an incorrect current password
- **THEN** the form SHALL display a server error message indicating the password is incorrect

#### Scenario: New password validation

- **WHEN** the user enters a new password that does not meet requirements
- **THEN** the form SHALL display a validation error before submitting

### Requirement: Account deletion with confirmation

The system SHALL provide an account deletion section in a visually distinct danger zone with a confirmation dialog.

#### Scenario: Delete account flow

- **WHEN** the user clicks the delete account button
- **THEN** the system SHALL open an AlertDialog requiring password entry to confirm deletion

#### Scenario: Successful account deletion

- **WHEN** the user enters the correct password in the confirmation dialog and confirms
- **THEN** the system SHALL call the delete account server action and redirect to the sign-in page

#### Scenario: Failed account deletion

- **WHEN** the user enters an incorrect password in the confirmation dialog
- **THEN** the system SHALL display an error message in the dialog without closing it

### Requirement: Profile form handles onboardingCompleted field

The profile form on the settings page SHALL NOT display the `onboardingCompleted` field as an editable form input. The field SHALL be preserved when submitting profile updates (i.e., the form SHALL not accidentally overwrite `onboardingCompleted` to `undefined` when updating other profile fields).

#### Scenario: Profile update preserves onboarding status

- **WHEN** a user updates their name on the settings page
- **THEN** the `onboardingCompleted` field retains its current value and is not sent as part of the form submission (or is sent with its current value)

### Requirement: i18n support

All user-facing text on the settings page SHALL use translation keys via next-intl.

#### Scenario: Translated labels

- **WHEN** the settings page renders in any supported locale
- **THEN** all labels, placeholders, buttons, toasts, and error messages SHALL use translated strings from the settings page namespace
