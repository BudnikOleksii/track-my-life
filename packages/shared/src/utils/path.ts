export const getPathWithoutLocale = (pathname: string): string => {
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
  return pathWithoutLocale || '/';
};
