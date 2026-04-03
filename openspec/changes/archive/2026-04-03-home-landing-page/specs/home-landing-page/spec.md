## ADDED Requirements

### Requirement: Landing page layout with footer

The `(home-layout)` route group SHALL have a `layout.tsx` that renders a sticky footer below the page content. The footer SHALL contain navigation links to: Privacy Policy, Terms of Service, and Contact Us. The footer SHALL also display a copyright notice with the current year.

#### Scenario: Footer renders with all navigation links

- **WHEN** a user visits the home page
- **THEN** the footer SHALL be visible at the bottom of the page with links labeled "Privacy Policy", "Terms of Service", and "Contact Us"

#### Scenario: Footer links use correct href values

- **WHEN** a user clicks a footer navigation link
- **THEN** each link SHALL navigate to its respective path (`/privacy-policy`, `/terms-of-service`, `/contact`)

#### Scenario: Footer displays copyright

- **WHEN** a user views the footer
- **THEN** the footer SHALL display "© {currentYear} Track My Money. All rights reserved."

### Requirement: Hero section

The hero section SHALL be the first visible section on the landing page. It SHALL contain a headline, a subheadline describing the product value, and two call-to-action buttons: a primary "Get Started" button and a secondary "Learn More" button. The "Get Started" button SHALL link to the sign-up page.

#### Scenario: Hero section renders with all elements

- **WHEN** a user visits the home page
- **THEN** the hero section SHALL display a headline, subheadline, and two CTA buttons

#### Scenario: Get Started button navigates to sign-up

- **WHEN** a user clicks the "Get Started" button
- **THEN** the user SHALL be navigated to the sign-up page

#### Scenario: Hero section is responsive

- **WHEN** a user views the hero section on a mobile device (< 768px)
- **THEN** the content SHALL stack vertically with full-width buttons
- **WHEN** a user views the hero section on a desktop device (>= 768px)
- **THEN** the content SHALL be centered with appropriate max-width constraints

### Requirement: Advantages section

The advantages section SHALL display a grid of feature cards highlighting key product benefits. Each advantage card SHALL have an icon/emoji, a title, and a short description. The section SHALL display at least 4 advantages.

#### Scenario: Advantages section renders feature cards

- **WHEN** a user scrolls to the advantages section
- **THEN** at least 4 advantage cards SHALL be visible, each with an icon, title, and description

#### Scenario: Advantages grid is responsive

- **WHEN** viewed on mobile (< 768px)
- **THEN** the advantages SHALL display in a single column
- **WHEN** viewed on tablet (>= 768px)
- **THEN** the advantages SHALL display in a 2-column grid
- **WHEN** viewed on desktop (>= 1024px)
- **THEN** the advantages SHALL display in a 4-column grid

### Requirement: Reviews section

The reviews section SHALL display customer testimonials. Each review SHALL contain the reviewer's name, a role/title, and a quote. The section SHALL display at least 3 reviews.

#### Scenario: Reviews section renders testimonials

- **WHEN** a user scrolls to the reviews section
- **THEN** at least 3 review cards SHALL be visible, each with a name, role, and quote text

#### Scenario: Reviews are responsive

- **WHEN** viewed on mobile (< 768px)
- **THEN** reviews SHALL stack in a single column
- **WHEN** viewed on desktop (>= 768px)
- **THEN** reviews SHALL display in a multi-column grid

### Requirement: FAQ section

The FAQ section SHALL display a list of frequently asked questions using an accordion (collapsible) pattern. Each FAQ item SHALL have a question as the trigger and an answer as the collapsible content. The section SHALL display at least 4 FAQ items. Only one FAQ item SHALL be open at a time.

#### Scenario: FAQ section renders with accordion

- **WHEN** a user scrolls to the FAQ section
- **THEN** at least 4 FAQ items SHALL be visible with questions shown and answers collapsed

#### Scenario: FAQ accordion interaction

- **WHEN** a user clicks on a FAQ question
- **THEN** the answer SHALL expand and become visible
- **WHEN** a user clicks on a different FAQ question
- **THEN** the previously open answer SHALL collapse and the new answer SHALL expand

#### Scenario: FAQ is accessible via keyboard

- **WHEN** a user navigates FAQ items with the keyboard
- **THEN** Enter/Space SHALL toggle the focused FAQ item open/closed

### Requirement: All content is internationalized

All visible text on the landing page SHALL be sourced from next-intl message files (`home-page.json`). Both English (en) and Ukrainian (uk) translations SHALL be provided.

#### Scenario: Page renders in English

- **WHEN** the locale is set to `en`
- **THEN** all landing page text SHALL render in English

#### Scenario: Page renders in Ukrainian

- **WHEN** the locale is set to `uk`
- **THEN** all landing page text SHALL render in Ukrainian

### Requirement: Page metadata

The landing page SHALL provide appropriate metadata (title and description) via Next.js `generateMetadata` for SEO purposes, sourced from i18n messages.

#### Scenario: Metadata is set correctly

- **WHEN** the page loads
- **THEN** the document title and meta description SHALL be set from the `home-page.json` metadata keys
