'use server';

import type { ServerActionResult } from '@track-my-life/next-shared/src/types/server-action-result';
import type { DeleteAccountDto } from '@track-my-life/shared/src/api/generated/types.gen';

import {
  profileApiService,
  serverActionTokenProvider,
} from '@track-my-life/next-shared/src/api/server-api';
import { redirect } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { getLocale } from 'next-intl/server';

import { redirectUnauthorized } from '@/actions/redirect-unauthorized';
import { PATHS } from '@/constants/paths';

import { deleteAccountFormSchema } from '../constants/delete-account-form-schema';

export const deleteAccount = async (input: DeleteAccountDto): Promise<ServerActionResult<true>> => {
  await redirectUnauthorized();

  const validated = deleteAccountFormSchema.safeParse(input);

  if (!validated.success) {
    return { ok: false, error: 'validationFailed' };
  }

  const { error } = await profileApiService.deleteAccount(validated.data);

  if (error) {
    return { ok: false, error: error?.title ?? 'unknownError' };
  }

  await serverActionTokenProvider.clearAccessToken();

  const locale = await getLocale();
  return redirect({ href: PATHS.signIn, locale });
};
