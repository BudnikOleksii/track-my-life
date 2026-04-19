import type {
  RecurringFrequency,
  RecurringTransactionStatus,
} from '@track-my-life/shared/src/api/generated/types.gen';
import type { BadgeVariant } from '@track-my-life/ui/src/components/atoms/badge/badge';

export const STATUS_BADGE_VARIANT_MAP: Record<RecurringTransactionStatus, BadgeVariant> = {
  ACTIVE: 'success',
  PAUSED: 'warning',
  CANCELLED: 'destructive',
} as const;

export const STATUS_LABEL_KEY: Record<RecurringTransactionStatus, string> = {
  ACTIVE: 'content.activeStatus',
  PAUSED: 'content.pausedStatus',
  CANCELLED: 'content.cancelledStatus',
} as const;

export const FREQUENCY_LABEL_KEY: Record<RecurringFrequency, string> = {
  DAILY: 'content.dailyFrequency',
  WEEKLY: 'content.weeklyFrequency',
  MONTHLY: 'content.monthlyFrequency',
  YEARLY: 'content.yearlyFrequency',
} as const;
