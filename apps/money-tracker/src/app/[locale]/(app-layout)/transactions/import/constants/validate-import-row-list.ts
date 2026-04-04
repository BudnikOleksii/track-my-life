import type { ZodIssue } from 'zod';

import type { ImportRow } from './import-row-schema';

import { importRowSchema } from './import-row-schema';

const ONE = 1;

export interface ValidatedRow {
  index: number;
  raw: Record<string, unknown>;
  valid: true;
  data: ImportRow;
}

export interface InvalidRow {
  index: number;
  raw: Record<string, unknown>;
  valid: false;
  errorList: ZodIssue[];
}

export type ImportRowResult = ValidatedRow | InvalidRow;

export interface ValidationResult {
  rowList: ImportRowResult[];
  validCount: number;
  invalidCount: number;
}

export const validateImportRowList = (rawRowList: Record<string, unknown>[]): ValidationResult => {
  let validCount = 0;
  let invalidCount = 0;

  const rowList = rawRowList.map<ImportRowResult>((raw, index) => {
    const result = importRowSchema.safeParse(raw);

    if (result.success) {
      validCount += ONE;
      return { index, raw, valid: true, data: result.data };
    }

    invalidCount += ONE;
    return { index, raw, valid: false, errorList: result.error.issues };
  });

  return { rowList, validCount, invalidCount };
};
