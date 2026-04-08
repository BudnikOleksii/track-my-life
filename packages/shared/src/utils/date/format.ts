import { parseLocalDate } from './parse';

const DATE_TIME_SEPARATOR = 'T';
const DATE_PART_INDEX = 0;

const parseDateSafe = (dateString: string): Date => {
  if (dateString.includes(DATE_TIME_SEPARATOR)) {
    const datePart = dateString.split(DATE_TIME_SEPARATOR)[DATE_PART_INDEX] ?? dateString;
    return parseLocalDate(datePart);
  }
  return parseLocalDate(dateString);
};

export const formatDate = (dateString: string, locale: string): string =>
  parseDateSafe(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const formatDateTime = (dateString: string, locale: string): string =>
  new Date(dateString).toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
