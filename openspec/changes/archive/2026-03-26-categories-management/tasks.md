## 1. UI Atoms & Molecules

- [x] 1.1 Create Checkbox atom component with Radix UI, SCSS module, and Storybook story
- [x] 1.2 Create Select atom component with Radix UI, SCSS module, and Storybook story
- [x] 1.3 Create Combobox molecule component with filterable dropdown, SCSS module, and Storybook story

## 2. API Service Layer

- [x] 2.1 Generate or verify API types for transaction-categories endpoints exist in `packages/shared/src/api/generated/`
- [x] 2.2 Create `CategoryApiService` extending `ApiClient` with CRUD methods and exported instance
- [x] 2.3 Add category-related type exports to shared package barrel files

## 3. Categories Settings Page — Route & Layout

- [x] 3.1 Create `/settings/categories` route with `page.tsx` and `page.content.tsx` under `(settings-layout)`
- [x] 3.2 Create `page.module.scss` with page-level styles
- [x] 3.3 Update sidebar navigation to link to `/settings/categories` (replace or remove top-level `/categories` stub)

## 4. Categories Settings Page — Components

- [x] 4.1 Create `CategoryTypeFilter` component (ALL / INCOME / EXPENSE toggle)
- [x] 4.2 Create `CategoryTree` component using Accordion for parent-child hierarchy display
- [x] 4.3 Create category form Zod schema in `constants/category-form-schema.ts`
- [x] 4.4 Create `CategoryForm` component (react-hook-form + Zod, Dialog modal) for create/edit
- [x] 4.5 Create `DeleteCategoryDialog` component using existing AlertDialog

## 5. Server Actions

- [x] 5.1 Create `create-category` server action with Zod validation and path revalidation
- [x] 5.2 Create `update-category` server action with Zod validation and path revalidation
- [x] 5.3 Create `delete-category` server action with path revalidation

## 6. i18n & Integration

- [x] 6.1 Extend `categoriesPage` namespace with all labels, buttons, form fields, and messages
- [x] 6.2 Wire up page content: fetch categories, render tree with filter, connect form/delete modals
- [x] 6.3 Handle empty state display when no categories exist
