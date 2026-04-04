'use client';

import type { ExportFormat } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { clientTransactionApiService } from '@track-my-life/shared/src/api/client-api';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { Download, Loader2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { downloadBlob } from './download-blob';
import styles from './ExportTransactionButton.module.scss';

interface ExportFilterParams {
  categoryId?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface ExportTransactionButtonProps extends ExportFilterParams {
  exportLabel: string;
  downloadCsvLabel: string;
  downloadJsonLabel: string;
  errorLabel: string;
}

const EXPORT_FORMAT_LIST: ExportFormat[] = ['csv', 'json'];

const FORMAT_TO_FALLBACK_FILENAME: Record<ExportFormat, string> = {
  csv: 'transactions.csv',
  json: 'transactions.json',
};

const fetchAndDownload = async (
  format: ExportFormat,
  filters: ExportFilterParams,
): Promise<boolean> => {
  const { blob, error, response } = await clientTransactionApiService.exportTransactionList({
    format,
    ...filters,
  });

  if (error || !blob) {
    return false;
  }

  downloadBlob(blob, response, FORMAT_TO_FALLBACK_FILENAME[format]);
  return true;
};

export const ExportTransactionButton: FC<ExportTransactionButtonProps> = ({
  categoryId,
  dateFrom,
  dateTo,
  exportLabel,
  downloadCsvLabel,
  downloadJsonLabel,
  errorLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const formatToLabel: Record<ExportFormat, string> = {
    csv: downloadCsvLabel,
    json: downloadJsonLabel,
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleExport = useCallback(
    async (format: ExportFormat) => {
      setIsOpen(false);
      setIsLoading(true);

      try {
        const success = await fetchAndDownload(format, { categoryId, dateFrom, dateTo });

        if (!success) {
          toast.error(errorLabel);
        }
      } catch {
        toast.error(errorLabel);
      } finally {
        setIsLoading(false);
      }
    },
    [categoryId, dateFrom, dateTo, errorLabel],
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        disabled={isLoading}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {isLoading ? <Loader2 size={16} className={styles.spinner} /> : <Download size={16} />}
        {exportLabel}
      </Button>
      {isOpen && (
        <div className={styles.menu} role="menu">
          {EXPORT_FORMAT_LIST.map((format) => (
            <button
              key={format}
              className={styles.menuItem}
              role="menuitem"
              onClick={() => {
                void handleExport(format);
              }}
            >
              <Typography variant="body-m">{formatToLabel[format]}</Typography>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
