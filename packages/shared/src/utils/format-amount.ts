const numberFormatCache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (locale: string | undefined, currencyCode: string): Intl.NumberFormat => {
  const key = `${locale}:${currencyCode}`;
  const cached = numberFormatCache.get(key);
  if (cached) {
    return cached;
  }
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode });
  numberFormatCache.set(key, formatter);
  return formatter;
};

export const formatAmount = (amount: string, currencyCode: string, locale?: string): string => {
  const numericAmount = parseFloat(amount);
  return getNumberFormat(locale, currencyCode).format(numericAmount);
};
