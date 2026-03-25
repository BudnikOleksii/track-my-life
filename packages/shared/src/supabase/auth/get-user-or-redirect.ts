// TODO: implement get-user API call and redirect on auth failure
export const getAuthenticatedUserOrRedirect = async (_redirectPath: string) => ({
  email: 'user@example.com',
  user_metadata: { name: 'User' },
});
