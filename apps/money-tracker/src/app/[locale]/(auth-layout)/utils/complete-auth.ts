import { forwardResponseCookieList } from '@track-my-life/next-shared/src/api/client/token/forward-response-cookie-list';
import { serverActionTokenProvider } from '@track-my-life/next-shared/src/api/server-api';
import { redirect } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { getLocale } from 'next-intl/server';

export const completeAuth = async (response: Response, accessToken: string, href: string) => {
  await Promise.all([
    forwardResponseCookieList(response),
    serverActionTokenProvider.setAccessToken(accessToken),
  ]);

  redirect({ href, locale: await getLocale() });
};
