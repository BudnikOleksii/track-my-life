import { updateTag } from 'next/cache';

import { CACHE_TAG } from '@/constants/cache-tag';

export const revalidateTransactionCaches = () => {
  updateTag(CACHE_TAG.TRANSACTIONS);
  updateTag(CACHE_TAG.ANALYTICS);
};
