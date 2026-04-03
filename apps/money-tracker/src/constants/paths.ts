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
  transactionsByCategory: '/transactions/by-category',
  budgets: '/budgets',
  recurringTransactions: '/recurring-transactions',
  recurringTransactionsCreate: '/recurring-transactions/create',
  settings: '/settings',
} as const;

export const getCategoriesEditPath = (id: string) => `/categories/${id}/edit` as const;

export const getTransactionsEditPath = (id: string) => `/transactions/${id}/edit` as const;

export const getRecurringTransactionsEditPath = (id: string) =>
  `/recurring-transactions/${id}/edit` as const;

export const getTransactionsByCategoryPath = (categoryId: string) =>
  `/transactions/by-category/${categoryId}` as const;

export const getRecurringTransactionsDetailPath = (id: string) =>
  `/recurring-transactions/${id}` as const;
