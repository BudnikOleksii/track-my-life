import { revalidatePath, revalidateTag } from 'next/cache';

import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

export const revalidateTransactionCaches = () => {
  revalidateTag(CACHE_TAG.TRANSACTIONS, 'max');
  revalidateTag(CACHE_TAG.ANALYTICS, 'max');
  revalidateTag(CACHE_TAG.CATEGORIES, 'max');
  revalidatePath(PATHS.transactions);
  revalidatePath(PATHS.dashboard);
};
