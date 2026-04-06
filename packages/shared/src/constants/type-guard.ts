export const checkIsObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const assertUnreachable = (value: never): never => {
  throw new Error(`Unexpected value: ${String(value)}`);
};
