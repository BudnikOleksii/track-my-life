'use server';

import { transactionApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath, revalidateTag } from 'next/cache';

import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

const revalidateImportCaches = () => {
  revalidateTag(CACHE_TAG.TRANSACTIONS, 'max');
  revalidateTag(CACHE_TAG.ANALYTICS, 'max');
  revalidateTag(CACHE_TAG.CATEGORIES, 'max');
  revalidatePath(PATHS.transactions);
};

export const importTransactionList = async (formData: FormData) => {
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return null;
  }

  const { data, error } = await transactionApiService.importTransactionList(file);

  if (error) {
    return { data: null, error };
  }

  revalidateImportCaches();

  return { data, error: null };
};
