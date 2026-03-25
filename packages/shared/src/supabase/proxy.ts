import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

// TODO: implement session validation with API
export const updateSession = async (request: NextRequest) => NextResponse.next({ request });
