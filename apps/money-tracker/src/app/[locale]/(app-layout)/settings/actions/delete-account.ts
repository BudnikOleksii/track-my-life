'use server';

import type { DeleteAccountDto } from '@track-my-life/shared/src/api/generated/types.gen';

import {
  profileApiService,
  serverActionTokenProvider,
} from '@track-my-life/next-shared/src/api/server-api';
import { redirect } from '@track-my-life/next-shared/src/i18n/navigation/navigation';
import { getLocale } from 'next-intl/server';

import { requireAuth } from '@/actions/require-auth';
import { PATHS } from '@/constants/paths';

import { deleteAccountFormSchema } from '../constants/delete-account-form-schema';

export const deleteAccount = async (input: DeleteAccountDto) => {
  await requireAuth();

  const validated = deleteAccountFormSchema.safeParse(input);

  if (!validated.success) {
    return null;
  }

  const { error } = await profileApiService.deleteAccount(validated.data);

  if (error) {
    return null;
  }

  await serverActionTokenProvider.clearAccessToken();

  const locale = await getLocale();
  return redirect({ href: PATHS.signIn, locale });
};
