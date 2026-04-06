import { ENDPOINTS } from './api-config';

export const fetchRefreshToken = (cookieHeader: string): Promise<Response> =>
  fetch(ENDPOINTS.REFRESH_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
  });
