export const PATHS = {
  signIn: '/sign-in',
  signUp: '/sign-up',
  verifyEmail: '/verify-email',
  onboarding: '/onboarding',
  dashboard: '/dashboard',
  transactions: '/transactions',
  transactionsCreate: '/transactions/create',
  categories: '/categories',
  categoriesCreate: '/categories/create',
  budgets: '/budgets',
  settings: '/settings',
} as const;

export const getCategoriesEditPath = (id: string) => `/categories/${id}/edit` as const;

export const getTransactionsEditPath = (id: string) => `/transactions/${id}/edit` as const;
