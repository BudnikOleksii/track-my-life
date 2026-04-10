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

export interface RequestOptions<TQuery extends Record<string, unknown> = Record<string, unknown>> {
  method: HttpMethod;
  url: string;
  body?: unknown | undefined;
  query?: TQuery | undefined;
  headers?: Record<string, string> | undefined;
  credentials?: RequestCredentials | undefined;
  next?: FetchCacheOptions | undefined;
}

export type ApiResponse<TData> =
  | { ok: true; data: TData; error: null; response: Response }
  | { ok: false; data: null; error: ProblemDetailsDto; response: Response };

export type BlobResponse =
  | { ok: true; blob: Blob; error: null; response: Response }
  | { ok: false; blob: null; error: ProblemDetailsDto; response: Response };

export type RequestInterceptorFn = (request: Request) => Request | Promise<Request>;

export type ResponseInterceptorFn = (
  response: Response,
  request: Request,
) => Response | Promise<Response>;
