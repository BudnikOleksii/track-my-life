# Track My Life - Improvement Roadmap

> Generated: 2026-04-05 | Analyzed by: architect-reviewer, nextjs-developer, performance-engineer, qa-expert, react-specialist, security-auditor, typescript-pro

## Progress Tracker

| #   | Task                                                    | Impact | Effort | Status   |
| --- | ------------------------------------------------------- | ------ | ------ | -------- |
| 1   | Add Security Headers                                    | 5      | S      | Done     |
| 3   | Add Error Boundaries and Loading States                 | 5      | M      | Done     |
| 5   | Add Build and Format Check to CI                        | 5      | S      | Done     |
| 6   | Fix JWT Validation in Middleware                        | 4      | M      | Done     |
| 7   | Add File Upload Validation                              | 4      | S      | Done     |
| 8   | Lazy-Load Recharts                                      | 4      | S      | Done     |
| 9   | Use Zod Enums Instead of Strings for Union Types        | 4      | M      | Done     |
| 10  | Fix Combobox Accessibility                              | 4      | M      | Done     |
| 11  | Decouple `packages/shared` from Next.js                 | 4      | L      | Todo     |
| 12  | Add SEO Essentials                                      | 3      | M      | Todo     |
| 13  | Fix Unsafe `query as Record<string, unknown>` Casts     | 3      | M      | Done     |
| 14  | Add Auth Guards to Server Actions                       | 3      | M      | Done     |
| 16  | Add Dashboard `revalidatePath` to Transaction Mutations | 3      | S      | Done     |
| 17  | Extract `useUrlFilters` Shared Hook                     | 2      | S      | Done     |
| 18  | Create `FormField` Wrapper for FieldError               | 2      | S      | Done     |
| 19  | Extract CategoryFormPage Logic to Hook                  | 2      | S      | Done     |
| 20  | Enable `exactOptionalPropertyTypes`                     | 2      | M      | Done     |
| 21  | Lazy-Load papaparse                                     | 2      | S      | Done     |
| 22  | Enable PPR for Dashboard                                | 2      | S      | Invalide |
| 23  | Deduplicate `lucide-react`                              | 1      | S      | Done     |
| 24  | Enable Turborepo Cache for Lint/Type-Check              | 1      | S      | Done     |
| 26  | Add Exhaustive Union Checking Pattern                   | 1 --   | S      | Done     |
| 27  | Adopt React 19 APIs (useActionState, useFormStatus)     | 1      | M      | Todo     |
| 28  | Fix Font Class Composition                              | 1      | S      | Done     |

## Backlog

Items moved to backlog for now — not top priority since the app is not in production.

| #   | Task                                     | Impact | Effort | Reason                                                     |
| --- | ---------------------------------------- | ------ | ------ | ---------------------------------------------------------- |
| 2   | Make Access Token Cookie HttpOnly        | 5      | M      | Need to brainstorm how to manage access token in browser   |
| 4   | Add Tests (Currently 0% Coverage)        | 5      | L      | Not top priority pre-production                            |
| 15  | Commit OpenAPI Spec File                 | 3      | S      | Active development, need to figure out sync strategy first |
| 25  | Add `exports` Field to `packages/shared` | 1      | S      | Removed — public API kept as-is                            |
| 29  | Add Storybook Interaction Tests          | 2      | M      | Not top priority pre-production                            |
| 30  | Set Up Chromatic for Visual Regression   | 2      | S      | Not top priority pre-production                            |

## Recommended Execution Order

**Sprint 1 (Quick Wins):** Items 1, 5, 7, 8, 16, 21, 24, 28 — all S effort
**Sprint 2 (Security):** Items 6, 14 — address auth vulnerabilities
**Sprint 3 (Stability):** Items 3 — error handling and loading states
**Sprint 4 (Type Safety):** Items 9, 13, 20 — strengthen the type system
**Sprint 5 (DX & Polish):** Items 10, 11, 12, 17-19 — architecture and DX improvements
**Low Priority:** Items 22-23, 26-27 — refinements
