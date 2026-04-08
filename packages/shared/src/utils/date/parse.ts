const MONTH_INDEX_OFFSET = 1;
const PAD_LENGTH = 2;
const MS_PER_MINUTE = 60_000;

const padMonth = (month: number): string => String(month).padStart(PAD_LENGTH, '0');

const padDay = (day: number): string => String(day).padStart(PAD_LENGTH, '0');

export const parseLocalDate = (dateString: string): Date => {
  const [yearStr, monthStr, dayStr] = dateString.split('-');
  return new Date(Number(yearStr), Number(monthStr) - MONTH_INDEX_OFFSET, Number(dayStr));
};

export const formatLocalDate = (isoString: string): string => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = padMonth(date.getMonth() + MONTH_INDEX_OFFSET);
  const day = padDay(date.getDate());
  return `${year}-${month}-${day}`;
};

export const convertLocalDateToUTCISO = (date: Date): string => date.toISOString();

export const convertDateStringToUTCISO = (
  dateString: string,
  timezoneOffsetMinutes: number,
): string => {
  const utcDate = new Date(`${dateString}T00:00:00.000Z`);
  const utcMs = utcDate.getTime() + timezoneOffsetMinutes * MS_PER_MINUTE;
  return new Date(utcMs).toISOString();
};
