import { AuthInterceptor } from './client/interceptors/auth-interceptor';
import { BrowserTokenProvider } from './client/token/browser-token-provider';
import { TransactionApiService } from './services/transaction-api.service';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

export const clientTransactionApiService = new TransactionApiService({
  baseUrl: API_BASE_URL,
  defaultCredentials: 'include',
});

const browserTokenProvider = new BrowserTokenProvider();
const browserAuthInterceptor = new AuthInterceptor({
  tokenProvider: browserTokenProvider,
  refreshUrl: `${API_BASE_URL}/api/auth/refresh-token`,
});
browserAuthInterceptor.setupOn(clientTransactionApiService);
