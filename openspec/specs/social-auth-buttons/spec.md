## ADDED Requirements

### Requirement: OAuth buttons navigate to backend provider endpoints

The `OAuthProviderButtons` component SHALL navigate the browser to the backend OAuth endpoints when clicked. Google button SHALL navigate to `NEXT_PUBLIC_API_BASE_URL + /api/auth/google`. GitHub button SHALL navigate to `NEXT_PUBLIC_API_BASE_URL + /api/auth/github`.

#### Scenario: Google button initiates OAuth flow

- **WHEN** the user clicks the Google sign-in button
- **THEN** the browser SHALL navigate to the backend Google OAuth endpoint, which redirects to Google's consent screen

#### Scenario: GitHub button initiates OAuth flow

- **WHEN** the user clicks the GitHub sign-in button
- **THEN** the browser SHALL navigate to the backend GitHub OAuth endpoint, which redirects to GitHub's consent screen

#### Scenario: Buttons are disabled during navigation

- **WHEN** a provider button is clicked and navigation is pending
- **THEN** all provider buttons SHALL be disabled to prevent double-clicks

### Requirement: LinkedIn OAuth button is removed

The system SHALL NOT render a LinkedIn OAuth button. The `OAuthProviderButtons` component SHALL only render Google and GitHub buttons.

#### Scenario: No LinkedIn button on sign-in page

- **WHEN** the sign-in page renders the OAuth provider buttons
- **THEN** only Google and GitHub buttons SHALL be visible; no LinkedIn button SHALL exist

#### Scenario: No LinkedIn button on sign-up page

- **WHEN** the sign-up page renders the OAuth provider buttons
- **THEN** only Google and GitHub buttons SHALL be visible; no LinkedIn button SHALL exist

### Requirement: OAuth buttons props updated

The `OAuthProviderButtons` component SHALL accept `googleLabel` and `githubLabel` props only. The `linkedinLabel` prop SHALL be removed.

#### Scenario: Component accepts only Google and GitHub labels

- **WHEN** the `OAuthProviderButtons` component is rendered
- **THEN** it SHALL accept `googleLabel` and `githubLabel` string props and render them as button text
