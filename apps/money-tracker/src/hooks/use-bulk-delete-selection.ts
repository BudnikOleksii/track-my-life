'use client';

import type { TranslateFn } from '@track-my-life/next-shared/src/types/translate-fn';

import { BULK_DELETE_MAX } from '@track-my-life/shared/src/constants/bulk-delete';
import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { useCallback, useMemo, useState } from 'react';

const checkAreAllVisibleSelected = (
  visibleIdList: string[],
  selectedIdSet: ReadonlySet<string>,
): boolean =>
  visibleIdList.length > EMPTY_LIST_LENGTH && visibleIdList.every((id) => selectedIdSet.has(id));

const getSetWithoutList = (source: ReadonlySet<string>, idList: string[]): Set<string> => {
  const next = new Set(source);
  for (const id of idList) {
    next.delete(id);
  }
  return next;
};

const getSetWithListUnderCap = (
  source: ReadonlySet<string>,
  idList: string[],
  onOverCap: () => void,
): Set<string> => {
  const next = new Set(source);
  for (const id of idList) {
    if (next.size >= BULK_DELETE_MAX) {
      onOverCap();
      break;
    }
    next.add(id);
  }
  return next;
};

interface UseSelectionSetParams {
  visibleIdList: string[];
  notifyOverCap: () => void;
}

const useSelectionSet = ({ visibleIdList, notifyOverCap }: UseSelectionSetParams) => {
  const [selectedIdSet, setSelectedIdSet] = useState<Set<string>>(new Set());

  const areAllVisibleSelected = useMemo(
    () => checkAreAllVisibleSelected(visibleIdList, selectedIdSet),
    [selectedIdSet, visibleIdList],
  );

  const handleToggleSelection = useCallback(
    (id: string) => {
      setSelectedIdSet((prev) => {
        if (prev.has(id)) {
          return getSetWithoutList(prev, [id]);
        }
        if (prev.size >= BULK_DELETE_MAX) {
          notifyOverCap();
          return prev;
        }
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    },
    [notifyOverCap],
  );

  const handleClearSelection = useCallback(() => {
    setSelectedIdSet(new Set());
  }, []);

  const handleSelectAllVisible = useCallback(() => {
    setSelectedIdSet((prev) => {
      if (visibleIdList.length === EMPTY_LIST_LENGTH) {
        return prev;
      }
      if (checkAreAllVisibleSelected(visibleIdList, prev)) {
        return getSetWithoutList(prev, visibleIdList);
      }
      return getSetWithListUnderCap(prev, visibleIdList, notifyOverCap);
    });
  }, [notifyOverCap, visibleIdList]);

  return {
    selectedIdSet,
    setSelectedIdSet,
    areAllVisibleSelected,
    handleToggleSelection,
    handleClearSelection,
    handleSelectAllVisible,
  };
};

interface UseBulkDeleteSelectionParams {
  visibleIdList: string[];
  translations: TranslateFn;
}

export const useBulkDeleteSelection = ({
  visibleIdList,
  translations,
}: UseBulkDeleteSelectionParams) => {
  const [bulkDeleteIdList, setBulkDeleteIdList] = useState<string[] | null>(null);
  const [isBulkDeleteSubmitting, setIsBulkDeleteSubmitting] = useState(false);

  const notifyOverCap = useCallback(() => {
    toast.info(translations('content.bulkDelete.overCapNotice', { cap: BULK_DELETE_MAX }));
  }, [translations]);

  const selection = useSelectionSet({ visibleIdList, notifyOverCap });

  const handleBulkDeleteOpen = useCallback(() => {
    setBulkDeleteIdList([...selection.selectedIdSet]);
  }, [selection.selectedIdSet]);

  const handleBulkDeleteClose = useCallback(() => {
    setBulkDeleteIdList(null);
  }, []);

  return {
    ...selection,
    bulkDeleteIdList,
    isBulkDeleteSubmitting,
    setIsBulkDeleteSubmitting,
    handleBulkDeleteOpen,
    handleBulkDeleteClose,
  };
};
