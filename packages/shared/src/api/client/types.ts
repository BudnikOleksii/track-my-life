import type { ProblemDetailsDto } from '../generated/types.gen';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiClientConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  defaultCredentials?: RequestCredentials;
}

export interface FetchCacheOptions {
  revalidate?: number;
  tags?: readonly string[];
}

export interface RequestOptions {
  method: HttpMethod;
  url: string;
  body?: unknown;
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  next?: FetchCacheOptions;
}

export interface ApiResponse<TData> {
  data: TData | null;
  error: ProblemDetailsDto | null;
  response: Response;
}

export interface BlobResponse {
  blob: Blob | null;
  error: ProblemDetailsDto | null;
  response: Response;
}

export type RequestInterceptorFn = (request: Request) => Request | Promise<Request>;

export type ResponseInterceptorFn = (
  response: Response,
  request: Request,
) => Response | Promise<Response>;
