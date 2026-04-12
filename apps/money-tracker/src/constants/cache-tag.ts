export const CACHE_TAG = {
  PROFILE: 'profile',
  CATEGORIES: 'categories',
  TRANSACTIONS: 'transactions',
  ANALYTICS: 'analytics',
  RECURRING_TRANSACTIONS: 'recurring-transactions',
  ONBOARDING: 'onboarding',
} as const;

export const ANALYTICS_CACHE = { revalidate: 300, tags: [CACHE_TAG.ANALYTICS] } as const;
export const TRANSACTIONS_CACHE = { revalidate: 300, tags: [CACHE_TAG.TRANSACTIONS] } as const;
export const RECURRING_TRANSACTIONS_CACHE = {
  revalidate: 3600,
  tags: [CACHE_TAG.RECURRING_TRANSACTIONS],
} as const;
export const CATEGORIES_CACHE = { revalidate: 3600, tags: [CACHE_TAG.CATEGORIES] } as const;
export const PROFILE_CACHE = { revalidate: 86_400, tags: [CACHE_TAG.PROFILE] } as const;
export const ONBOARDING_CACHE = { revalidate: 3600, tags: [CACHE_TAG.ONBOARDING] } as const;
