'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';

import { transactionApiService } from '@track-my-life/next-shared/src/api/server-api';
import { BULK_DELETE_MAX, BULK_DELETE_MIN } from '@track-my-life/shared/src/constants/bulk-delete';
import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { z } from 'zod';

import { redirectUnauthorized } from '@/actions/redirect-unauthorized';
import { entityIdSchema } from '@/constants/entity-id-schema';

import type { BulkDeleteResult } from './types';

import { revalidateTransactionCaches } from './revalidate-transaction-caches';
import { mapToBulkDeleteResult } from './types';

const bulkDeleteSchema = z.array(entityIdSchema).min(BULK_DELETE_MIN).max(BULK_DELETE_MAX);

export const bulkDeleteTransaction = async (
  idList: string[],
): Promise<ServerActionResult<BulkDeleteResult>> => {
  await redirectUnauthorized();

  if (!bulkDeleteSchema.safeParse(idList).success) {
    return { ok: false, error: 'validationFailed' };
  }

  const { data, error } = await transactionApiService.bulkDelete(idList);

  if (error) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  const result = mapToBulkDeleteResult(data);

  if (result.deletedCount > EMPTY_LIST_LENGTH) {
    revalidateTransactionCaches();
  }

  return { ok: true, data: result };
};
