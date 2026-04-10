'use client';

import type { ExportFormat } from '@track-my-life/shared/src/api/generated/types.gen';
import type { FC } from 'react';

import { clientTransactionApiService } from '@track-my-life/shared/src/api/client-api';
import {
  convertLocalDateToUTCISO,
  parseLocalDate,
} from '@track-my-life/shared/src/utils/date/parse';
import { Button } from '@track-my-life/ui/src/components/atoms/button/button';
import { Typography } from '@track-my-life/ui/src/components/atoms/typography/Typography';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@track-my-life/ui/src/components/molecules/dropdown-menu/dropdown-menu';
import { toast } from '@track-my-life/ui/src/components/molecules/toaster/toast';
import { Download, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);

  const formatToLabel: Record<ExportFormat, string> = {
    csv: downloadCsvLabel,
    json: downloadJsonLabel,
  };

  const handleExport = useCallback(
    async (format: ExportFormat) => {
      setIsLoading(true);

      try {
        const success = await fetchAndDownload(format, {
          ...(categoryId !== undefined && { categoryId }),
          ...(dateFrom !== undefined && {
            dateFrom: convertLocalDateToUTCISO(parseLocalDate(dateFrom)),
          }),
          ...(dateTo !== undefined && {
            dateTo: convertLocalDateToUTCISO(parseLocalDate(dateTo)),
          }),
        });

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isLoading}>
          {isLoading ? <Loader2 size={16} className={styles.spinner} /> : <Download size={16} />}
          {exportLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {EXPORT_FORMAT_LIST.map((format) => (
          <DropdownMenuItem
            key={format}
            onSelect={() => {
              void handleExport(format);
            }}
          >
            <Typography variant="body-m">{formatToLabel[format]}</Typography>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
