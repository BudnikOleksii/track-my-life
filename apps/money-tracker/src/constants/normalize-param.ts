const FIRST_ELEMENT_INDEX = 0;

export const normalizeParam = (value: string | string[] | undefined): string =>
  Array.isArray(value) ? (value[FIRST_ELEMENT_INDEX] ?? '') : (value ?? '');
