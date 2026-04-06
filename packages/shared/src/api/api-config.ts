const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const API_BASE_URL = NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

export const ENDPOINTS = {
  REFRESH_TOKEN: `${API_BASE_URL}/api/auth/refresh-token`,
} as const;
