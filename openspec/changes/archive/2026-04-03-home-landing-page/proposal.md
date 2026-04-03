## Why

The money-tracker app currently has a minimal placeholder home page (a single card with title and two buttons). Users arriving at the root URL see no product information, social proof, or answers to common questions. A proper landing page is needed to communicate the product's value, build trust, and drive sign-ups.

## What Changes

- Replace the existing placeholder home page content with a full landing page featuring: Hero section, Advantages section, Reviews section, and FAQ section
- Add a `(home-layout)/layout.tsx` with a header and footer — footer includes navigation links to Privacy Policy, Terms of Service, and Contact Us pages
- Expand `home-page.json` i18n messages (en + uk) with all landing page copy
- Create modular section components under `(home-layout)/components/`
- Use existing UI primitives (Button, Typography, Card, Accordion) from `@track-my-life/ui`

## Capabilities

### New Capabilities

- `home-landing-page`: Full landing page with hero, advantages, reviews, FAQ sections, and footer navigation layout

### Modified Capabilities

(none)

## Impact

- **Files modified**: `(home-layout)/page.content.tsx`, `(home-layout)/page.module.scss`, `(home-layout)/page.tsx`, `messages/en/home-page.json`, `messages/uk/home-page.json`
- **Files created**: `(home-layout)/layout.tsx`, `(home-layout)/layout.module.scss`, `(home-layout)/components/` (HeroSection, AdvantagesSection, ReviewsSection, FaqSection, Footer + their SCSS modules)
- **Dependencies**: No new packages — uses existing Radix Accordion, Button, Typography, Card from `@track-my-life/ui`
- **No API changes**: This is a static marketing page with no backend interaction
