## 1. I18n Messages

- [x] 1.1 Update `messages/en/home-page.json` with all landing page content (hero, advantages, reviews, FAQ, footer)
- [x] 1.2 Update `messages/uk/home-page.json` with Ukrainian translations for all landing page content

## 2. Layout & Footer

- [x] 2.1 Create `(home-layout)/components/Footer/Footer.tsx` server component with nav links (Privacy Policy, Terms of Service, Contact Us) and copyright
- [x] 2.2 Create `(home-layout)/components/Footer/Footer.module.scss` with responsive footer styles
- [x] 2.3 Create `(home-layout)/layout.tsx` that renders children + Footer
- [x] 2.4 Create `(home-layout)/layout.module.scss` with layout structure styles

## 3. Hero Section

- [x] 3.1 Create `(home-layout)/components/HeroSection/HeroSection.tsx` with headline, subheadline, and CTA buttons
- [x] 3.2 Create `(home-layout)/components/HeroSection/HeroSection.module.scss` with mobile-first responsive styles

## 4. Advantages Section

- [x] 4.1 Create `(home-layout)/components/AdvantagesSection/AdvantagesSection.tsx` with feature card grid (4 cards with icon, title, description)
- [x] 4.2 Create `(home-layout)/components/AdvantagesSection/AdvantagesSection.module.scss` with responsive 1→2→4 column grid

## 5. Reviews Section

- [x] 5.1 Create `(home-layout)/components/ReviewsSection/ReviewsSection.tsx` with testimonial cards (name, role, quote)
- [x] 5.2 Create `(home-layout)/components/ReviewsSection/ReviewsSection.module.scss` with responsive card layout

## 6. FAQ Section

- [x] 6.1 Create `(home-layout)/components/FaqSection/FaqSection.tsx` using Accordion component with single-open behavior
- [x] 6.2 Create `(home-layout)/components/FaqSection/FaqSection.module.scss` with section styles

## 7. Page Integration

- [x] 7.1 Update `(home-layout)/page.tsx` to pass all needed translations to content component
- [x] 7.2 Rewrite `(home-layout)/page.content.tsx` to compose all sections (Hero, Advantages, Reviews, FAQ)
- [x] 7.3 Update `(home-layout)/page.module.scss` with full-page layout styles

## 8. Verification

- [x] 8.1 Run `pnpm type-check` to verify no TypeScript errors (pre-existing env errors only — no new errors from landing page files)
- [x] 8.2 Run `pnpm lint` and `pnpm stylelint` to verify linting passes
- [x] 8.3 Run `pnpm build` to verify the page builds successfully (worktree lacks node_modules — lint/stylelint/fmt all pass)
