## 1. Remove forwardRef from UI components

- [x] 1.1 Remove forwardRef from `packages/ui/src/components/atoms/input/input.tsx` — convert to regular function with ref prop
- [x] 1.2 Remove forwardRef from `packages/ui/src/components/atoms/badge/badge.tsx`
- [x] 1.3 Remove forwardRef from `packages/ui/src/components/atoms/select/select.tsx` (multiple sub-components)
- [x] 1.4 Remove forwardRef from `packages/ui/src/components/atoms/skeleton/skeleton.tsx`
- [x] 1.5 Remove forwardRef from `packages/ui/src/components/atoms/checkbox/checkbox.tsx`
- [x] 1.6 Remove forwardRef from `packages/ui/src/components/atoms/avatar/avatar.tsx`
- [x] 1.7 Remove forwardRef from `packages/ui/src/components/atoms/aspect-ratio/aspect-ratio.tsx`
- [x] 1.8 Remove forwardRef from `packages/ui/src/components/atoms/alert/alert.tsx`
- [x] 1.9 Remove forwardRef from `packages/ui/src/components/atoms/underline-link/underline-link.tsx`
- [x] 1.10 Remove forwardRef from `packages/ui/src/components/molecules/breadcrumb/breadcrumb.tsx`
- [x] 1.11 Remove forwardRef from `packages/ui/src/components/molecules/alert-dialog/alert-dialog.tsx`
- [x] 1.12 Remove forwardRef from `packages/ui/src/components/molecules/accordion/accordion.tsx`
- [x] 1.13 Remove `.displayName` assignments from all converted components
- [x] 1.14 Verify build passes and ref forwarding works for Radix-based components

## 2. Adopt useActionState for form submission

- [x] 2.1 Create a shared `useServerAction` pattern or utility that wraps `useActionState` with the project's server action return type
- [x] 2.2 Migrate auth forms: `sign-in` and `sign-up` actions to use useActionState in `AuthForm.tsx`
- [x] 2.3 Migrate settings forms: `use-change-password-form.ts` and `use-profile-form.ts` to use useActionState
- [x] 2.4 Migrate onboarding form: `use-onboarding-profile-form.ts` to use useActionState
- [x] 2.5 Migrate category form: `use-category-form-page.ts` to integrate useActionState for submission
- [x] 2.6 Migrate transaction form: `use-transaction-form-page.ts` to integrate useActionState for submission
- [x] 2.7 Migrate recurring transaction form: `use-recurring-transaction-form-page.ts` to integrate useActionState for submission

## 3. Add useFormStatus to submit buttons

- [x] 3.1 ~~Create a `SubmitButton` component~~ — SKIPPED: `useFormStatus` requires `<form action={}>` pattern; forms use RHF `onSubmit`, so `isPending` from `useActionState` (Group 2) serves this role instead
- [x] 3.2 ~~Replace manual `isLoading`/`isPending` props~~ — SKIPPED: Already handled by `isPending` from `useActionState` in Group 2

## 4. Add useOptimistic for recurring transaction mutations

- [x] 4.1 Add `useOptimistic` for pause/resume toggle in recurring transaction detail page
- [x] 4.2 Add `useOptimistic` for delete in recurring transaction detail/list, removing item from UI immediately
- [x] 4.3 Add error handling: revert optimistic state and show toast on server action failure

## 5. Replace useContext with use()

- [x] 5.1 Replace `useContext(SidebarContext)` with `use(SidebarContext)` in sidebar hook

## 6. Validation

- [x] 6.1 Run type-check, lint, and build to verify no regressions
- [ ] 6.2 Run existing E2E tests to confirm form flows still work
- [ ] 6.3 Manually test ref forwarding on key UI components (Input, Select, AlertDialog)
