## Context

The money-tracker app has a scaffolded but empty settings page at `[locale]/(app-layout)/settings/(settings-layout)/`. The backend provides full profile management via REST endpoints (`GET/PATCH /api/profile`, `POST /api/profile/password`, `DELETE /api/profile`). The generated types (`ProfileResponseDto`, `UpdateProfileDto`, `ChangePasswordDto`, `DeleteAccountDto`) are already available in `packages/shared`. No frontend API service or UI exists yet.

## Goals / Non-Goals

**Goals:**

- Allow users to view and edit profile fields (firstName, lastName, countryCode, baseCurrencyCode)
- Allow users to change their password
- Allow users to delete their account (with confirmation)
- Follow existing patterns: RSC data fetching, server actions for mutations, react-hook-form + zod for forms

**Non-Goals:**

- Avatar/photo upload
- Email change (not supported by current API)
- Theme/appearance preferences
- Notification settings
- Multi-session management

## Decisions

### 1. Single settings page with sectioned layout (not tabbed/routed sub-pages)

All settings content lives on the main `/settings` page, organized into visual sections: Profile, Password, Danger Zone. The scope is small enough that sub-routes would add complexity without benefit.

**Alternative**: Nested routes (`/settings/profile`, `/settings/security`). Rejected because with only 3 sections, a single scrollable page is simpler and more discoverable.

### 2. Profile API service in `packages/shared`

Create `profile-api.service.ts` following the same `extends ApiClient` pattern as `category-api.service.ts`. Each service file exports its own instance. Methods: `fetchProfile`, `updateProfile`, `changePassword`, `deleteAccount`.

### 3. Server actions for each mutation

Three separate server action files in the settings feature directory:

- `update-profile.ts` — calls `profileApiService.updateProfile`, revalidates path
- `change-password.ts` — calls `profileApiService.changePassword`
- `delete-account.ts` — calls `profileApiService.deleteAccount`, redirects to sign-in

### 4. Profile data fetched in RSC page, passed to client form components

The `page.tsx` server component fetches profile via `rsc-api.ts` service instance and passes data to `SettingsPageContent` (client). The client component renders three form sections, each with its own hook (`useProfileForm`, `useChangePasswordForm`).

### 5. Delete account requires password + confirmation dialog

Uses the existing `AlertDialog` component pattern. User must enter their password to confirm deletion. This matches the `DeleteAccountDto` requirement.

### 6. Combobox for countryCode and baseCurrencyCode selection

Reuse the existing `Combobox` component from the UI library for searchable dropdown selection of country and currency, since there are many options.

## Risks / Trade-offs

- [Risk] Profile fetch failure on settings page load → Show error state with retry, same pattern as other pages
- [Risk] Account deletion is irreversible → Mitigated by password confirmation + AlertDialog double-confirmation
- [Trade-off] Single page vs. sub-routes → Simpler now but may need refactoring if settings grow significantly
