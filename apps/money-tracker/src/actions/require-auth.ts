import { ACCESS_TOKEN_COOKIE } from '@track-my-life/shared/src/constants/cookie';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { PATHS } from '@/constants/paths';

export const requireAuth = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    redirect(PATHS.signIn);
  }
};
