import { API_BASE_URL, ENDPOINTS } from './api-config';
import { AuthInterceptor } from './client/interceptors/auth-interceptor';
import { BrowserTokenProvider } from './client/token/browser-token-provider';
import { TransactionApiService } from './services/transaction-api.service';

export const clientTransactionApiService = new TransactionApiService({
  baseUrl: API_BASE_URL,
  defaultCredentials: 'include',
});

const browserTokenProvider = new BrowserTokenProvider();
const browserAuthInterceptor = new AuthInterceptor({
  tokenProvider: browserTokenProvider,
  refreshUrl: ENDPOINTS.REFRESH_TOKEN,
});
browserAuthInterceptor.setupOn(clientTransactionApiService);
