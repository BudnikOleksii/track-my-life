import { getPathWithoutLocale } from '@track-my-life/shared/src/utils/path';

import { PATHS } from '@/constants/paths';

const PUBLIC_PATH_LIST = [
  PATHS.signIn,
  PATHS.signUp,
  PATHS.verifyEmail,
  PATHS.authCallback,
  PATHS.homePage,
];

export const checkIsPublicPath = (pathname: string): boolean =>
  PUBLIC_PATH_LIST.some((publicPath) => {
    const normalizedPath = getPathWithoutLocale(pathname);
    return normalizedPath === publicPath || normalizedPath.startsWith(`${publicPath}/`);
  });

export const checkIsOnboardingPath = (pathname: string): boolean => {
  const normalizedPath = getPathWithoutLocale(pathname);
  return normalizedPath === PATHS.onboarding || normalizedPath.startsWith(`${PATHS.onboarding}/`);
};
