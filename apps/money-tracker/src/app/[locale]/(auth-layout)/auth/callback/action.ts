'use server';

import { forwardResponseCookieList } from '@track-my-life/next-shared/src/api/client/token/forward-response-cookie-list';
import {
  authApiService,
  serverActionTokenProvider,
} from '@track-my-life/next-shared/src/api/server-api';
import { MIN_FIELD_LENGTH } from '@track-my-life/shared/src/constants/list';
import { z } from 'zod';

const socialCodeSchema = z.string().min(MIN_FIELD_LENGTH);

interface ExchangeResult {
  success: boolean;
}

export const exchangeSocialCode = async (code: string): Promise<ExchangeResult> => {
  const validated = socialCodeSchema.safeParse(code);

  if (!validated.success) {
    return { success: false };
  }

  const { data, error, response } = await authApiService.exchangeSocialCode({
    code: validated.data,
  });

  if (error || !data) {
    return { success: false };
  }

  await Promise.all([
    forwardResponseCookieList(response),
    serverActionTokenProvider.setAccessToken(data.accessToken),
  ]);

  return { success: true };
};
