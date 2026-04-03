export const formatAmount = (amount: string, currencyCode: string, locale?: string): string => {
  const numericAmount = parseFloat(amount);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(numericAmount);
};
