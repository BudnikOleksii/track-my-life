const MONTH_INDEX_OFFSET = 1;
const JANUARY = 1;
const DECEMBER = 12;
const LAST_DAY_OFFSET = 0;
const PAD_LENGTH = 2;

export interface YearMonth {
  year: number;
  month: number;
}

export interface MonthDateRange {
  dateFrom: string;
  dateTo: string;
}

const padMonth = (month: number): string => String(month).padStart(PAD_LENGTH, '0');

const padDay = (day: number): string => String(day).padStart(PAD_LENGTH, '0');

export const getCurrentYearMonth = (): YearMonth => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + MONTH_INDEX_OFFSET };
};

export const getUtcYearMonth = (): YearMonth => {
  const now = new Date();
  return { year: now.getUTCFullYear(), month: now.getUTCMonth() + MONTH_INDEX_OFFSET };
};

export const getYearMonth = (dateString?: string): YearMonth => {
  if (!dateString) {
    return getUtcYearMonth();
  }

  const [yearStr, monthStr] = dateString.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);

  if (!Number.isFinite(year) || month < JANUARY || month > DECEMBER) {
    return getUtcYearMonth();
  }

  return { year, month };
};

export const getMonthDateRange = (year: number, month: number): MonthDateRange => {
  const lastDay = new Date(year, month, LAST_DAY_OFFSET).getDate();
  return {
    dateFrom: `${year}-${padMonth(month)}-01`,
    dateTo: `${year}-${padMonth(month)}-${padDay(lastDay)}`,
  };
};

export const parseMonthFromDateRange = (dateFrom: string): YearMonth => {
  const [yearStr, monthStr] = dateFrom.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);

  if (Number.isNaN(year) || Number.isNaN(month) || month < JANUARY || month > DECEMBER) {
    return getCurrentYearMonth();
  }

  return { year, month };
};

export const getPreviousMonth = (year: number, month: number): YearMonth => {
  if (month === JANUARY) {
    return { year: year - MONTH_INDEX_OFFSET, month: DECEMBER };
  }
  return { year, month: month - MONTH_INDEX_OFFSET };
};

export const getNextMonth = (year: number, month: number): YearMonth => {
  if (month === DECEMBER) {
    return { year: year + MONTH_INDEX_OFFSET, month: JANUARY };
  }
  return { year, month: month + MONTH_INDEX_OFFSET };
};

export const formatMonthYear = (year: number, month: number, locale: string): string => {
  const date = new Date(year, month - MONTH_INDEX_OFFSET);
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(date);
};
