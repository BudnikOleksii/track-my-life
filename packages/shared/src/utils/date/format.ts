import { parseLocalDate } from './parse';

const DATE_TIME_SEPARATOR = 'T';
const DATE_PART_INDEX = 0;

const dateFormatCache = new Map<string, Intl.DateTimeFormat>();
const dateTimeFormatCache = new Map<string, Intl.DateTimeFormat>();

const getDateFormat = (locale: string): Intl.DateTimeFormat => {
  const cached = dateFormatCache.get(locale);
  if (cached) {
    return cached;
  }
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  dateFormatCache.set(locale, formatter);
  return formatter;
};

const getDateTimeFormat = (locale: string): Intl.DateTimeFormat => {
  const cached = dateTimeFormatCache.get(locale);
  if (cached) {
    return cached;
  }
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  dateTimeFormatCache.set(locale, formatter);
  return formatter;
};

const parseDateSafe = (dateString: string): Date => {
  if (dateString.includes(DATE_TIME_SEPARATOR)) {
    const datePart = dateString.split(DATE_TIME_SEPARATOR)[DATE_PART_INDEX] ?? dateString;
    return parseLocalDate(datePart);
  }
  return parseLocalDate(dateString);
};

export const formatDate = (dateString: string, locale: string): string =>
  getDateFormat(locale).format(parseDateSafe(dateString));

export const formatDateTime = (dateString: string, locale: string): string =>
  getDateTimeFormat(locale).format(new Date(dateString));
