import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';
import { headers } from 'next/headers';

interface RateLimitConfig {
  maxAttemptCount: number;
  windowMs: number;
}

interface RateLimitEntry {
  timestampList: number[];
}

const DEFAULT_MAX_ATTEMPT_COUNT = 5;
const DEFAULT_WINDOW_MS = 60_000;
const CLEANUP_INTERVAL_MS = 60_000;
const FALLBACK_IP = '127.0.0.1';
const FIRST_ELEMENT_INDEX = 0;

const entryMap = new Map<string, RateLimitEntry>();
let lastCleanupTimestamp = Date.now();

const cleanupExpiredEntries = (windowMs: number) => {
  const now = Date.now();

  if (now - lastCleanupTimestamp < CLEANUP_INTERVAL_MS) {
    return;
  }

  lastCleanupTimestamp = now;

  for (const [key, entry] of entryMap) {
    const validTimestampList = entry.timestampList.filter(
      (timestamp) => now - timestamp < windowMs,
    );

    if (validTimestampList.length === EMPTY_LIST_LENGTH) {
      entryMap.delete(key);
    } else {
      entry.timestampList = validTimestampList;
    }
  }
};

const getClientIp = async (): Promise<string> => {
  const headerStore = await headers();
  const forwardedFor = headerStore.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[FIRST_ELEMENT_INDEX]?.trim() ?? FALLBACK_IP;
  }

  return headerStore.get('x-real-ip') ?? FALLBACK_IP;
};

interface ResolvedConfig {
  maxAttemptCount: number;
  windowMs: number;
}

const resolveConfig = (config?: RateLimitConfig): ResolvedConfig => ({
  maxAttemptCount: config?.maxAttemptCount ?? DEFAULT_MAX_ATTEMPT_COUNT,
  windowMs: config?.windowMs ?? DEFAULT_WINDOW_MS,
});

interface CheckEntryParams {
  entry: RateLimitEntry;
  now: number;
  config: ResolvedConfig;
}

const checkEntryWithinLimit = ({ entry, now, config }: CheckEntryParams): boolean => {
  entry.timestampList = entry.timestampList.filter(
    (timestamp) => now - timestamp < config.windowMs,
  );

  if (entry.timestampList.length >= config.maxAttemptCount) {
    return false;
  }

  entry.timestampList.push(now);
  return true;
};

export const checkRateLimit = async (
  actionName: string,
  config?: RateLimitConfig,
): Promise<boolean> => {
  const resolvedConfig = resolveConfig(config);

  cleanupExpiredEntries(resolvedConfig.windowMs);

  const key = `${actionName}:${await getClientIp()}`;
  const now = Date.now();
  const entry = entryMap.get(key);

  if (!entry) {
    entryMap.set(key, { timestampList: [now] });
    return true;
  }

  return checkEntryWithinLimit({ entry, now, config: resolvedConfig });
};
