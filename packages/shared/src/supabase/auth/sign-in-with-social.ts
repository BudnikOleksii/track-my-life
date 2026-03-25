export type OAuthProviderName = 'google' | 'github' | 'linkedin_oidc';

// TODO: implement OAuth sign-in API call
export const signInWithOAuthProvider = async (
  _provider: OAuthProviderName,
  _redirectTo?: string,
) => {};
