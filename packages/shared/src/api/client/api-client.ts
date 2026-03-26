import type { ProblemDetailsDto } from '../generated/types.gen';
import type {
  ApiClientConfig,
  ApiResponse,
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
  private requestInterceptorList: RequestInterceptorFn[] = [];
  private responseInterceptorList: ResponseInterceptorFn[] = [];

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.defaultHeaders = config.defaultHeaders ?? {};
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

  protected async request<TData>(options: RequestOptions): Promise<ApiResponse<TData>> {
    const initialRequest = this.buildRequest(options);
    const fetchRequest = await applyRequestInterceptorList(
      this.requestInterceptorList,
      initialRequest,
    );
    const fetchRequestClone = fetchRequest.clone();
    const rawResponse = await fetch(fetchRequest);
    const response = await applyResponseInterceptorList(
      this.responseInterceptorList,
      rawResponse,
      fetchRequestClone,
    );
    const { data, error } = await parseResponseBody<TData>(response);

    return { data, error, response };
  }

  private buildRequest(options: RequestOptions): Request {
    const url = buildUrl(this.baseUrl, options.url, options.query);
    const headers = new Headers({ ...this.defaultHeaders, ...options.headers });

    if (options.body !== undefined) {
      headers.set('Content-Type', 'application/json');
    }

    return new Request(url, {
      method: options.method,
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  }
}
