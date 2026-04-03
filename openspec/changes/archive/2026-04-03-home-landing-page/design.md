## Context

The money-tracker app has a `(home-layout)` route group with a placeholder page (single Card with title and two buttons). There is no layout.tsx for this route group — it falls through to the root locale layout. The app uses Next.js 16, React 19, SCSS modules, next-intl, and Radix-based UI primitives from `@track-my-life/ui`. Existing i18n messages exist in `home-page.json` (en + uk) with minimal keys.

## Goals / Non-Goals

**Goals:**

- Create a visually compelling, production-quality landing page that communicates the product's value proposition
- Build modular, reusable section components following existing project patterns
- Add a layout with footer containing policy and contact navigation links
- Fully internationalize all content via next-intl (en + uk)
- Mobile-first responsive design using existing breakpoint mixins
- Use only existing UI primitives — no new package dependencies

**Non-Goals:**

- Creating the actual Privacy Policy, Terms of Service, or Contact Us pages (links only)
- Adding authentication state awareness to the landing page header
- Analytics or tracking integration
- A/B testing infrastructure
- Animation libraries or complex motion design

## Decisions

### 1. Component architecture: Section-based composition

Each landing page section (Hero, Advantages, Reviews, FAQ) is a standalone server component under `(home-layout)/components/`. Each receives translated strings via props from the page. This keeps components pure and testable without i18n coupling.

**Alternative considered**: Single monolithic page.content.tsx — rejected because it would become unwieldy and harder to maintain.

### 2. Layout with footer

Create `(home-layout)/layout.tsx` that wraps children and renders a Footer component. The footer uses standard `<a>` tags for external/policy links since these pages don't exist yet and don't need active state tracking.

**Alternative considered**: Footer inside page.content.tsx — rejected because the footer should persist across any future pages in this layout group.

### 3. FAQ using Radix Accordion

The FAQ section uses the existing `Accordion` component from `@track-my-life/ui` (wraps `@radix-ui/react-accordion`). This provides accessible expand/collapse with keyboard navigation out of the box.

**Alternative considered**: Custom disclosure component — rejected; Accordion already exists and matches the interaction pattern.

### 4. Reviews as static data

Reviews are hardcoded in i18n message files as an array of reviewer name + text. No backend integration — this is a marketing page with curated testimonials.

**Alternative considered**: Fetching reviews from an API — rejected; no reviews API exists and this is static marketing content.

### 5. All content via i18n

Every visible string lives in `home-page.json`. The page component passes translation functions to sections. This supports the existing en/uk locale setup with zero additional configuration.

### 6. Mobile-first SCSS with existing design tokens

Use CSS custom properties (`--spacing-*`, `--radius-*`, color tokens) and breakpoint mixins (`@include media-m`, `@include media-l`) for responsive layout. No new design tokens needed.

## Risks / Trade-offs

- [Static reviews may feel inauthentic] → Mitigated by using realistic but clearly curated testimonials; can be replaced with dynamic reviews later
- [No header/nav on landing page] → Intentional for now — landing page focuses on conversion; authenticated users go directly to `/dashboard`
- [Footer links point to non-existent pages] → Acceptable per requirements — links will 404 until those pages are created; href values are ready for future routing
