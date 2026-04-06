## 1. ErrorState UI Component

- [x] 1.1 Create `ErrorState` component in `packages/ui/src/components/molecules/error-state/` with title, description, onRetry, and onNavigateHome props
- [x] 1.2 Add SCSS module styles for ErrorState (centered layout, spacing, icon)
- [x] 1.3 Add ErrorState Storybook story in `apps/storybook/src/stories/`

## 2. Error Boundaries

- [x] 2.1 Add i18n translation keys for error messages (error title, description, retry button, go home button, 404 messages)
- [x] 2.2 Create `[locale]/(app-layout)/error.tsx` using ErrorState with retry action
- [x] 2.3 Create `[locale]/(auth-layout)/error.tsx` using ErrorState with retry action
- [x] 2.4 Create `[locale]/error.tsx` as root fallback with hardcoded English strings and go-home action
- [x] 2.5 Create `[locale]/not-found.tsx` with 404 message and go-home navigation

## 3. Route Loading States

- [x] 3.1 Create `(app-layout)/dashboard/loading.tsx` with skeleton grid matching dashboard widget layout
- [x] 3.2 Create `(app-layout)/transactions/loading.tsx` with skeleton header and list items
- [x] 3.3 Create `(app-layout)/categories/loading.tsx` with skeleton header and list items
- [x] 3.4 Create `(app-layout)/budgets/loading.tsx` with skeleton placeholder
- [x] 3.5 Create `(app-layout)/settings/loading.tsx` with skeleton form fields

## 4. Verification

- [x] 4.1 Run type-check to ensure all new files compile
- [x] 4.2 Run lint and format checks
- [x] 4.3 Run build to verify no build errors
