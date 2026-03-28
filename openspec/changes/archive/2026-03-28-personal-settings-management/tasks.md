## 1. Profile API Service

- [x] 1.1 Create `ProfileApiService` class in `packages/shared/src/api/services/profile-api.service.ts` with methods: `fetchProfile`, `updateProfile`, `changePassword`, `deleteAccount`
- [x] 1.2 Register `ProfileApiService` instance in money-tracker `rsc-api.ts` (read-only token)
- [x] 1.3 Register `ProfileApiService` instance in money-tracker `server-api.ts` (read-write token)

## 2. Server Actions & Data Fetching

- [x] 2.1 Create `fetchProfile` read function in settings actions directory using RSC service instance
- [x] 2.2 Create `update-profile` server action with zod validation and `revalidatePath`
- [x] 2.3 Create `change-password` server action with zod validation
- [x] 2.4 Create `delete-account` server action with zod validation and redirect to sign-in

## 3. Form Schemas & Constants

- [x] 3.1 Create `profile-form-schema.ts` with zod schema for profile fields (firstName, lastName, countryCode, baseCurrencyCode)
- [x] 3.2 Create `change-password-form-schema.ts` with zod schema for currentPassword and newPassword
- [x] 3.3 Create `delete-account-form-schema.ts` with zod schema for password confirmation

## 4. Settings Page UI

- [x] 4.1 Update `page.tsx` to fetch profile data via RSC and pass to content component
- [x] 4.2 Add Suspense boundary with skeleton fallback for profile loading state
- [x] 4.3 Build `ProfileForm` client component with fields for firstName, lastName, countryCode (Combobox), baseCurrencyCode (Combobox)
- [x] 4.4 Create `useProfileForm` hook encapsulating form logic and submit handler
- [x] 4.5 Build `ChangePasswordForm` client component with currentPassword and newPassword fields
- [x] 4.6 Create `useChangePasswordForm` hook encapsulating form logic and submit handler
- [x] 4.7 Build `DeleteAccountSection` component with AlertDialog confirmation requiring password input
- [x] 4.8 Update `SettingsPageContent` to compose all three sections with proper layout

## 5. i18n

- [x] 5.1 Add translation keys for settings page (labels, placeholders, buttons, toasts, validation errors) to all locale files
- [x] 5.2 Add settings page namespace to i18n namespace constants if not already present
