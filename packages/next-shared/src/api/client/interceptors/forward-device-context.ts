import type { RequestInterceptorFn } from '@track-my-life/shared/src/api/client/types';

import { EMPTY_LIST_LENGTH } from '@track-my-life/shared/src/constants/list';

const getForwardableHeaderMap = (incomingHeaders: Headers): Record<string, string> => {
  const forwardedFor = incomingHeaders.get('x-forwarded-for') ?? incomingHeaders.get('x-real-ip');
  const userAgent = incomingHeaders.get('user-agent');

  return {
    ...(forwardedFor && { 'x-forwarded-for': forwardedFor }),
    ...(userAgent && { 'user-agent': userAgent }),
  };
};

export const forwardDeviceContext: RequestInterceptorFn = async (request) => {
  const { headers: getHeaders } = await import('next/headers');
  const incomingHeaders = await getHeaders();
  const forwardableHeaderEntryList = Object.entries(getForwardableHeaderMap(incomingHeaders));

  if (forwardableHeaderEntryList.length === EMPTY_LIST_LENGTH) {
    return request;
  }

  const forwardedRequest = new Request(request, { headers: new Headers(request.headers) });

  for (const [name, value] of forwardableHeaderEntryList) {
    forwardedRequest.headers.set(name, value);
  }

  return forwardedRequest;
};
