---
root: false
targets: ['*']
description: 'React component conventions'
globs: ['**/*.tsx', '**/*.jsx']
---

## Component Architecture

- Favor React Server Components (RSC) where possible
- Minimize 'use client' directives
- Implement proper error boundaries
- Use Suspense for async operations
- Optimize for performance and Web Vitals (LCP, CLS, FID)

## React Conventions

- Use all simple UI components (Typography, Button, Input, etc.) from `packages/ui`.
- Use `NavigationLink` from `packages/shared/src/i18n/navigation/NavigationLink.tsx` instead of Next.js default `Link` for navigation links that need active state tracking.
- Use `redirect`, `usePathname`, `useRouter` from `packages/shared/src/i18n/navigation/navigation.ts` instead of Next.js default `next/link` and `next/navigation` to ensure proper i18n routing.
- Use the `cn` utility from `packages/ui/src/lib/utils.ts` for conditional class composition instead of ternary operators or string concatenation.

## State Management

- Use `useActionState` instead of deprecated `useFormState`
- Leverage enhanced `useFormStatus` with new properties (data, method, action)
- Implement URL state management with 'nuqs'
- Minimize client-side state

## Async Request APIs

```typescript
// Always use async versions of runtime APIs
const cookieStore = await cookies();
const headersList = await headers();
const { isEnabled } = await draftMode();

// Handle async params in layouts/pages
const params = await props.params;
const searchParams = await props.searchParams;
```

## Props

- Prefix callback props with `on` (e.g., `onSubmit`, `onClick`).
- Prefix handler functions with `handle` (e.g., `handleSubmit`, `handleClick`).
- Always use curly braces for handler bodies, no implicit returns.
- Omit curly braces for string literal props.

## Component Structure

```text
my-component/
├── MyComponent.tsx
├── types.ts              # Shared types (optional)
├── constants.ts          # Component constants (optional)
├── hooks/                # Component-specific hooks (optional)
└── components/           # Child components (optional)
```
