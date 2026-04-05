'use server';

import { transactionApiService } from '@track-my-life/shared/src/api/server-api';
import { revalidatePath, revalidateTag } from 'next/cache';

import { CACHE_TAG } from '@/constants/cache-tag';
import { PATHS } from '@/constants/paths';

const MAX_FILE_SIZE_BYTES = 5_242_880;
const ALLOWED_MIME_TYPE_LIST = ['text/csv', 'application/json'] as const;

type FileValidationResult = { ok: true; file: File } | { ok: false; error: string };

const getValidatedImportFile = (formData: FormData): FileValidationResult => {
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return { ok: false, error: 'invalidFile' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, error: 'fileTooLarge' };
  }

  if (!ALLOWED_MIME_TYPE_LIST.includes(file.type as (typeof ALLOWED_MIME_TYPE_LIST)[number])) {
    return { ok: false, error: 'invalidMimeType' };
  }

  return { ok: true, file };
};

const revalidateImportCaches = () => {
  revalidateTag(CACHE_TAG.TRANSACTIONS, 'max');
  revalidateTag(CACHE_TAG.ANALYTICS, 'max');
  revalidateTag(CACHE_TAG.CATEGORIES, 'max');
  revalidatePath(PATHS.transactions);
  revalidatePath(PATHS.dashboard);
};

export const importTransactionList = async (formData: FormData) => {
  const fileResult = getValidatedImportFile(formData);

  if (!fileResult.ok) {
    return { data: null, error: fileResult.error };
  }

  const { data, error } = await transactionApiService.importTransactionList(fileResult.file);

  if (error) {
    return { data: null, error };
  }

  revalidateImportCaches();

  return { data, error: null };
};
