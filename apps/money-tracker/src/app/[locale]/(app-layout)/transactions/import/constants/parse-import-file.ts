import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { checkIsObject } from '@track-my-life/shared/src/constants/type-guard';

const ACCEPTED_EXTENSION_LIST = ['.json', '.csv'] as const;
const MAX_ROW_COUNT = 3000;

const getFileExtension = (fileName: string): string =>
  fileName.slice(fileName.lastIndexOf('.')).toLowerCase();

const checkIsAcceptedExtension = (extension: string): boolean =>
  ACCEPTED_EXTENSION_LIST.includes(extension as (typeof ACCEPTED_EXTENSION_LIST)[number]);

interface ParseSuccess {
  ok: true;
  rowList: Record<string, unknown>[];
}

interface ParseError {
  ok: false;
  error: string;
}

type ParseResult = ParseSuccess | ParseError;

const parseJson = (text: string): ParseResult => {
  try {
    const parsed = JSON.parse(text);

    if (!Array.isArray(parsed)) {
      return { ok: false, error: 'fileNotArray' };
    }

    if (parsed.length === EMPTY_LIST_LENGTH) {
      return { ok: false, error: 'fileEmpty' };
    }

    if (parsed.length > MAX_ROW_COUNT) {
      return { ok: false, error: 'fileTooManyRows' };
    }

    return { ok: true, rowList: (parsed as unknown[]).filter(checkIsObject) };
  } catch {
    return { ok: false, error: 'jsonMalformed' };
  }
};

const parseCsv = async (text: string): Promise<ParseResult> => {
  const Papa = await import('papaparse').then((mod) => mod.default);
  const result = Papa.parse<Record<string, unknown>>(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: { Amount: true },
  });

  if (result.errors.length > EMPTY_LIST_LENGTH) {
    return { ok: false, error: 'csvMalformed' };
  }

  if (result.data.length === EMPTY_LIST_LENGTH) {
    return { ok: false, error: 'fileEmpty' };
  }

  if (result.data.length > MAX_ROW_COUNT) {
    return { ok: false, error: 'fileTooManyRows' };
  }

  return { ok: true, rowList: result.data };
};

export const parseImportFile = async (file: File): Promise<ParseResult> => {
  const extension = getFileExtension(file.name);

  if (!checkIsAcceptedExtension(extension)) {
    return { ok: false, error: 'unsupportedFileType' };
  }

  const text = await file.text();

  if (extension === '.json') {
    return parseJson(text);
  }

  return await parseCsv(text);
};
