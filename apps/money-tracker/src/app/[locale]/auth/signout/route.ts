import type { NextRequest } from 'next/server';

import { signOutServer } from '@track-my-life/shared/src/supabase/server';
import { NextResponse } from 'next/server';

import { ROUTES } from '@/constants/routes';

const POST = async (request: NextRequest) => {
  await signOutServer();

  const response = NextResponse.redirect(new URL(ROUTES.signIn, request.url));

  return response;
};

export { POST };
