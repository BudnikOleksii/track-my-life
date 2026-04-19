import type { BulkDeleteResponseDto } from '@track-my-life/shared/src/api/generated/types.gen';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';

export interface BulkDeleteResult {
  deletedCount: number;
  failureList: { id: string; reason: string }[];
}

export const mapToBulkDeleteResult = (
  data: BulkDeleteResponseDto | undefined,
): BulkDeleteResult => ({
  deletedCount: data?.deleted ?? EMPTY_LIST_LENGTH,
  failureList: (data?.failed ?? []).map(({ id, reason }) => ({ id, reason })),
});
