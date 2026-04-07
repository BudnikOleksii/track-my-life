import { convertDateStringToUTCISO } from './date';

interface DateFilterParams {
  dateFrom?: string;
  dateTo?: string;
}

export const convertFilterDateList = (
  params: DateFilterParams,
  timezoneOffsetMinutes: number,
): DateFilterParams => ({
  ...(params.dateFrom && {
    dateFrom: convertDateStringToUTCISO(params.dateFrom, timezoneOffsetMinutes),
  }),
  ...(params.dateTo && {
    dateTo: convertDateStringToUTCISO(params.dateTo, timezoneOffsetMinutes),
  }),
});
