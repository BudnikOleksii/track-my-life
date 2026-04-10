import { ACCESS_TOKEN_COOKIE } from '@track-my-life/shared/src/constants/cookie';
import { verifyToken } from '@track-my-life/shared/src/utils/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { PATHS } from '@/constants/paths';

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

export const requireAuth = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    redirect(PATHS.signIn);
  }

  const payload = await verifyToken(accessToken, {
    secret: JWT_SECRET,
    ...(JWT_ISSUER !== undefined && { issuer: JWT_ISSUER }),
    ...(JWT_AUDIENCE !== undefined && { audience: JWT_AUDIENCE }),
  });

  if (!payload) {
    redirect(PATHS.signIn);
  }
};
