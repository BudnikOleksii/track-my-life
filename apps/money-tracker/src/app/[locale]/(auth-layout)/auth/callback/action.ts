'use server';

import { forwardResponseCookieList } from '@track-my-life/next-shared/src/api/client/token/forward-response-cookie-list';
import {
  authApiService,
  serverActionTokenProvider,
} from '@track-my-life/next-shared/src/api/server-api';

interface ExchangeResult {
  success: boolean;
}

export const exchangeSocialCode = async (code: string): Promise<ExchangeResult> => {
  const { data, error, response } = await authApiService.exchangeSocialCode({ code });

  if (error || !data) {
    return { success: false };
  }

  await Promise.all([
    forwardResponseCookieList(response),
    serverActionTokenProvider.setAccessToken(data.accessToken),
  ]);

  return { success: true };
};
