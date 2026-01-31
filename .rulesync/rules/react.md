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

## State Management

- Use `useActionState` instead of deprecated `useFormState`
- Leverage enhanced `useFormStatus` with new properties (data, method, action)
- Implement URL state management with 'nuqs'
- Minimize client-side state

## Async Request APIs

```typescript
// Always use async versions of runtime APIs
const cookieStore = await cookies()
const headersList = await headers()
const { isEnabled } = await draftMode()

// Handle async params in layouts/pages
const params = await props.params
const searchParams = await props.searchParams
```

## Props

- Prefix callback props with `on` (e.g., `onSubmit`, `onClick`).
- Prefix handler functions with `handle` (e.g., `handleSubmit`, `handleClick`).
- Always use curly braces for handler bodies, no implicit returns.
- Omit curly braces for string literal props.

## Component Structure

```
my-component/
├── MyComponent.tsx
├── types.ts              # Shared types (optional)
├── constants.ts          # Component constants (optional)
├── hooks/                # Component-specific hooks (optional)
└── components/           # Child components (optional)
```
