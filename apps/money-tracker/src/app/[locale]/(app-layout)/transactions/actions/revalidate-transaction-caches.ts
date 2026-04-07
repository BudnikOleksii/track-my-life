import { revalidatePath, updateTag } from 'next/cache';

import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

export const revalidateTransactionCaches = () => {
  updateTag(CACHE_TAG.TRANSACTIONS);
  updateTag(CACHE_TAG.ANALYTICS);
  updateTag(CACHE_TAG.CATEGORIES);
  revalidatePath(PATHS.transactions);
  revalidatePath(PATHS.dashboard);
};
