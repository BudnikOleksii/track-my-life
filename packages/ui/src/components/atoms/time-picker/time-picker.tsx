'use client';

import type { ChangeEvent, KeyboardEvent, Ref } from 'react';

import { useCallback } from 'react';

import { cn } from '../../../lib/utils';
import styles from './time-picker.module.scss';

const MAX_HOURS = 23;
const MAX_MINUTES = 59;
const PAD_LENGTH = 2;
const MIN_VALUE = 0;
const STEP = 1;
const DEFAULT_VALUE = 0;

const formatPadded = (value: number): string => String(value).padStart(PAD_LENGTH, '0');

const parseTimeString = (value: string): { hours: number; minutes: number } => {
  const [hoursStr, minutesStr] = value.split(':');
  return {
    hours: Number(hoursStr) || DEFAULT_VALUE,
    minutes: Number(minutesStr) || DEFAULT_VALUE,
  };
};

const formatTimeString = (hours: number, minutes: number): string =>
  `${formatPadded(hours)}:${formatPadded(minutes)}`;

const clampValue = (value: number, max: number): number => {
  if (value < MIN_VALUE) {
    return max;
  }
  if (value > max) {
    return MIN_VALUE;
  }
  return value;
};

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

const TimePicker = ({ value = '00:00', onChange, disabled, className, ref }: TimePickerProps) => {
  const { hours, minutes } = parseTimeString(value);

  const handleHoursChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const raw = Number(event.target.value);
      if (Number.isNaN(raw)) {
        return;
      }
      const clamped = Math.min(Math.max(raw, MIN_VALUE), MAX_HOURS);
      onChange?.(formatTimeString(clamped, minutes));
    },
    [minutes, onChange],
  );

  const handleMinutesChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const raw = Number(event.target.value);
      if (Number.isNaN(raw)) {
        return;
      }
      const clamped = Math.min(Math.max(raw, MIN_VALUE), MAX_MINUTES);
      onChange?.(formatTimeString(hours, clamped));
    },
    [hours, onChange],
  );

  const handleHoursKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        onChange?.(formatTimeString(clampValue(hours + STEP, MAX_HOURS), minutes));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        onChange?.(formatTimeString(clampValue(hours - STEP, MAX_HOURS), minutes));
      }
    },
    [hours, minutes, onChange],
  );

  const handleMinutesKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        onChange?.(formatTimeString(hours, clampValue(minutes + STEP, MAX_MINUTES)));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        onChange?.(formatTimeString(hours, clampValue(minutes - STEP, MAX_MINUTES)));
      }
    },
    [hours, minutes, onChange],
  );

  return (
    <div ref={ref} data-slot="time-picker" className={cn(styles.root, className)}>
      <input
        type="text"
        inputMode="numeric"
        value={formatPadded(hours)}
        onChange={handleHoursChange}
        onKeyDown={handleHoursKeyDown}
        disabled={disabled}
        aria-label="Hours"
        className={styles.input}
      />
      <span className={styles.separator}>:</span>
      <input
        type="text"
        inputMode="numeric"
        value={formatPadded(minutes)}
        onChange={handleMinutesChange}
        onKeyDown={handleMinutesKeyDown}
        disabled={disabled}
        aria-label="Minutes"
        className={styles.input}
      />
    </div>
  );
};

export { TimePicker };
