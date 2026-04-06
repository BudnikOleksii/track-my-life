import type { ProblemDetailsDto } from '../generated/types.gen';
import type {
  ApiClientConfig,
  ApiResponse,
  BlobResponse,
  RequestInterceptorFn,
  RequestOptions,
  ResponseInterceptorFn,
} from './types';

const buildUrl = (baseUrl: string, path: string, query?: Record<string, unknown>): string => {
  const url = new URL(path, baseUrl);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
};

const parseResponseBody = async <TData>(
  response: Response,
): Promise<{
  data: TData | null;
  error: ProblemDetailsDto | null;
}> => {
  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
  const hasJsonBody = contentType.includes('application/json') || contentType.includes('+json');

  if (!hasJsonBody) {
    return response.ok
      ? { data: null, error: null }
      : {
          data: null,
          error: { type: 'about:blank', title: response.statusText, status: response.status },
        };
  }

  try {
    const body = await response.json();

    return response.ok
      ? { data: body as TData, error: null }
      : { data: null, error: body as ProblemDetailsDto };
  } catch {
    return {
      data: null,
      error: { type: 'about:blank', title: 'Invalid JSON response', status: response.status },
    };
  }
};

const applyRequestInterceptorList = (
  interceptorList: RequestInterceptorFn[],
  initialRequest: Request,
): Promise<Request> =>
  interceptorList.reduce<Promise<Request>>(
    (requestPromise, interceptor) => requestPromise.then(interceptor),
    Promise.resolve(initialRequest),
  );

const applyResponseInterceptorList = (
  interceptorList: ResponseInterceptorFn[],
  initialResponse: Response,
  request: Request,
): Promise<Response> =>
  interceptorList.reduce<Promise<Response>>(
    (responsePromise, interceptor) =>
      responsePromise.then((currentResponse) => interceptor(currentResponse, request)),
    Promise.resolve(initialResponse),
  );

const removeFromList = <T>(list: T[], item: T): T[] => list.filter((entry) => entry !== item);

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private defaultCredentials: RequestCredentials | undefined;
  private requestInterceptorList: RequestInterceptorFn[] = [];
  private responseInterceptorList: ResponseInterceptorFn[] = [];

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.defaultHeaders = config.defaultHeaders ?? {};
    this.defaultCredentials = config.defaultCredentials;
  }

  addRequestInterceptor(fn: RequestInterceptorFn): () => void {
    this.requestInterceptorList.push(fn);
    return () => {
      this.requestInterceptorList = removeFromList(this.requestInterceptorList, fn);
    };
  }

  addResponseInterceptor(fn: ResponseInterceptorFn): () => void {
    this.responseInterceptorList.push(fn);
    return () => {
      this.responseInterceptorList = removeFromList(this.responseInterceptorList, fn);
    };
  }

  private buildFetchInit(
    fetchRequest: Request,
    options: RequestOptions<Record<string, unknown>>,
  ): RequestInit & { next?: unknown } {
    const fetchInit: RequestInit & { next?: unknown } = {
      method: fetchRequest.method,
      headers: fetchRequest.headers,
      body: fetchRequest.body,
      ...(fetchRequest.body ? { duplex: 'half' } : {}),
    };
    const credentials = options.credentials ?? this.defaultCredentials;
    if (credentials) {
      fetchInit.credentials = credentials;
    }
    if (options.next) {
      fetchInit.next = {
        ...(options.next.revalidate !== undefined && { revalidate: options.next.revalidate }),
        ...(options.next.tags && { tags: [...options.next.tags] as string[] }),
      } as Record<string, unknown>;
    }
    return fetchInit;
  }

  private async executeFetch(options: RequestOptions<Record<string, unknown>>): Promise<Response> {
    const initialRequest = this.buildRequest(options);
    const fetchRequest = await applyRequestInterceptorList(
      this.requestInterceptorList,
      initialRequest,
    );
    const fetchRequestClone = fetchRequest.clone();
    const fetchInit = this.buildFetchInit(fetchRequest, options);
    const rawResponse = await fetch(fetchRequest.url, fetchInit as RequestInit);
    return applyResponseInterceptorList(
      this.responseInterceptorList,
      rawResponse,
      fetchRequestClone,
    );
  }

  protected async request<TData, TQuery extends Record<string, unknown> = Record<string, unknown>>(
    options: RequestOptions<TQuery>,
  ): Promise<ApiResponse<TData>> {
    const response = await this.executeFetch(options);
    const { data, error } = await parseResponseBody<TData>(response);
    return { data, error, response };
  }

  protected async requestBlob<TQuery extends Record<string, unknown> = Record<string, unknown>>(
    options: RequestOptions<TQuery>,
  ): Promise<BlobResponse> {
    const response = await this.executeFetch(options);

    if (!response.ok) {
      const { error } = await parseResponseBody<never>(response);
      return { blob: null, error, response };
    }

    const blob = await response.blob();
    return { blob, error: null, response };
  }

  protected async requestFormData<TData>(
    options: Omit<RequestOptions, 'body'> & { formData: FormData },
  ): Promise<ApiResponse<TData>> {
    const url = buildUrl(this.baseUrl, options.url, options.query);
    const headers = new Headers({ ...this.defaultHeaders, ...options.headers });

    const initialRequest = new Request(url, {
      method: options.method,
      headers,
      body: options.formData,
    });

    const fetchRequest = await applyRequestInterceptorList(
      this.requestInterceptorList,
      initialRequest,
    );
    const fetchRequestClone = fetchRequest.clone();
    const rawResponse = await fetch(fetchRequest.url, {
      method: fetchRequest.method,
      headers: fetchRequest.headers,
      body: fetchRequest.body,
      duplex: 'half',
    } as RequestInit);
    const response = await applyResponseInterceptorList(
      this.responseInterceptorList,
      rawResponse,
      fetchRequestClone,
    );
    const { data, error } = await parseResponseBody<TData>(response);

    return { data, error, response };
  }

  private buildRequest(options: RequestOptions<Record<string, unknown>>): Request {
    const url = buildUrl(this.baseUrl, options.url, options.query);
    const headers = new Headers({ ...this.defaultHeaders, ...options.headers });

    if (options.body !== undefined) {
      headers.set('Content-Type', 'application/json');
    }

    return new Request(url, {
      method: options.method,
      headers,
      ...(options.body !== undefined && { body: JSON.stringify(options.body) }),
    });
  }
}
