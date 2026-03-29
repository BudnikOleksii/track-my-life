## MODIFIED Requirements

### Requirement: Profile form handles onboardingCompleted field

The profile form on the settings page SHALL NOT display the `onboardingCompleted` field as an editable form input. The field SHALL be preserved when submitting profile updates (i.e., the form SHALL not accidentally overwrite `onboardingCompleted` to `undefined` when updating other profile fields).

#### Scenario: Profile update preserves onboarding status

- **WHEN** a user updates their name on the settings page
- **THEN** the `onboardingCompleted` field retains its current value and is not sent as part of the form submission (or is sent with its current value)
