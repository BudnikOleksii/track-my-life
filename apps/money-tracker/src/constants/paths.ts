export const PATHS = {
  homePage: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  verifyEmail: '/verify-email',
  authCallback: '/auth/callback',
  onboarding: '/onboarding',
  dashboard: '/dashboard',
  transactions: '/transactions',
  transactionsCreate: '/transactions/create',
  categories: '/categories',
  categoriesCreate: '/categories/create',
  transactionsByCategory: '/transactions/by-category',
  budgets: '/budgets',
  transactionsImport: '/transactions/import',
  recurringTransactions: '/transactions/recurring',
  recurringTransactionsCreate: '/transactions/recurring/create',
  settings: '/settings',
} as const;

export const getCategoriesEditPath = (id: string) => `${PATHS.categories}/${id}/edit` as const;

export const getTransactionsEditPath = (id: string) => `${PATHS.transactions}/${id}/edit` as const;

export const getRecurringTransactionsEditPath = (id: string) =>
  `${PATHS.recurringTransactions}/${id}/edit` as const;

export const getTransactionsByCategoryPath = (categoryId: string) =>
  `${PATHS.transactionsByCategory}/${categoryId}` as const;

export const getTransactionsCopyPath = (id: string) =>
  `${PATHS.transactionsCreate}?copyFrom=${id}` as const;

export const getRecurringTransactionsDetailPath = (id: string) =>
  `${PATHS.recurringTransactions}/${id}` as const;
