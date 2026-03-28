## Why

The money-tracker app has an empty settings page with no functionality. Users need to manage their profile information (name, country, base currency), change their password, and delete their account. The backend API already supports all these operations via profile endpoints, but the frontend has no UI for them.

## What Changes

- Create a profile API service in `packages/shared` to call profile endpoints (get, update, change password, delete account)
- Build a settings page with sections for viewing/editing profile info, changing password, and deleting account
- Add server actions for profile update, password change, and account deletion
- Allow users to set their `baseCurrencyCode` preference, which is critical for the finance tracking use case

## Capabilities

### New Capabilities

- `profile-api-service`: API service for profile endpoints (get profile, update profile, change password, delete account)
- `profile-settings-ui`: Settings page UI with profile form, password change form, and account deletion section
- `profile-server-actions`: Server actions for profile mutations (update profile, change password, delete account)

### Modified Capabilities

None — this is a new feature built on the existing empty settings route.

## Impact

- **API layer**: New `profile-api.service.ts` in `packages/shared/src/api/services/`
- **Routes**: Populate existing `settings/(settings-layout)/` route with content
- **Server actions**: New actions in the settings feature directory
- **i18n**: New translation keys for settings page labels, validation messages, and toasts
