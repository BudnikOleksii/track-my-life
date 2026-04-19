'use client';

import type { FC, ReactNode } from 'react';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { useTranslations } from 'next-intl';
import { createContext, useContext } from 'react';

import { BulkDeleteActionBar } from '@/components/bulk-delete-action-bar/BulkDeleteActionBar';
import { useBulkDeleteSelection } from '@/hooks/use-bulk-delete-selection';
import { I18N_NAMESPACE } from '@/i18n/constants/i18n-namespace';

import { BulkDeleteTransactionDialog } from '../../components/bulk-delete-transaction-dialog/BulkDeleteTransactionDialog';

interface SelectionContextValue {
  selectedIdSet: ReadonlySet<string>;
  onToggleSelection: (id: string) => void;
  isBulkDeleteSubmitting: boolean;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export const useSelectionContext = (): SelectionContextValue => {
  const value = useContext(SelectionContext);
  if (!value) {
    throw new Error('useSelectionContext must be used within BulkDeleteSelection');
  }
  return value;
};

interface BulkDeleteSelectionProps {
  visibleIdList: string[];
  children: ReactNode;
}

export const BulkDeleteSelection: FC<BulkDeleteSelectionProps> = ({ visibleIdList, children }) => {
  const translations = useTranslations(I18N_NAMESPACE.transactionsPage);
  const {
    selectedIdSet,
    setSelectedIdSet,
    bulkDeleteIdList,
    isBulkDeleteSubmitting,
    setIsBulkDeleteSubmitting,
    areAllVisibleSelected,
    handleToggleSelection,
    handleClearSelection,
    handleSelectAllVisible,
    handleBulkDeleteOpen,
    handleBulkDeleteClose,
  } = useBulkDeleteSelection({ visibleIdList, translations });

  const selectedCount = selectedIdSet.size;

  return (
    <SelectionContext.Provider
      value={{ selectedIdSet, onToggleSelection: handleToggleSelection, isBulkDeleteSubmitting }}
    >
      {children}

      {selectedCount > EMPTY_LIST_LENGTH && (
        <BulkDeleteActionBar
          selectedCount={selectedCount}
          selectedCountLabel={translations('content.bulkDelete.selectedCount', {
            count: selectedCount,
          })}
          deleteLabel={translations('content.bulkDelete.deleteSelected')}
          clearLabel={translations('content.bulkDelete.clearSelection')}
          selectAllLabel={translations(
            areAllVisibleSelected
              ? 'content.bulkDelete.deselectAllVisible'
              : 'content.bulkDelete.selectAllVisible',
          )}
          onDelete={handleBulkDeleteOpen}
          onClear={handleClearSelection}
          onSelectAllVisible={handleSelectAllVisible}
          isSubmitting={isBulkDeleteSubmitting}
          areAllVisibleSelected={areAllVisibleSelected}
        />
      )}

      <BulkDeleteTransactionDialog
        idList={bulkDeleteIdList}
        onClose={handleBulkDeleteClose}
        onSubmittingChange={setIsBulkDeleteSubmitting}
        setSelectedIdSet={setSelectedIdSet}
      />
    </SelectionContext.Provider>
  );
};
