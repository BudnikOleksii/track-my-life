import { API_BASE_URL, ENDPOINTS } from './api-config';
import { AuthInterceptor } from './client/interceptors/auth-interceptor';
import { forwardResponseCookieList } from './client/token/forward-response-cookie-list';
import { ServerActionTokenProvider } from './client/token/server-action-token-provider';
import { AuthApiService } from './services/auth-api.service';
import { CategoryApiService } from './services/category-api.service';
import { ProfileApiService } from './services/profile-api.service';
import { RecurringTransactionApiService } from './services/recurring-transaction-api.service';
import { TransactionApiService } from './services/transaction-api.service';
import { TransactionsAnalyticsApiService } from './services/transactions-analytics-api.service';

export const serverActionTokenProvider = new ServerActionTokenProvider();

const getRequestCookieHeader = async (): Promise<string | null> => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const authApiService = new AuthApiService({ baseUrl: API_BASE_URL });
export const categoryApiService = new CategoryApiService({ baseUrl: API_BASE_URL });
export const profileApiService = new ProfileApiService({ baseUrl: API_BASE_URL });
export const recurringTransactionApiService = new RecurringTransactionApiService({
  baseUrl: API_BASE_URL,
});
export const transactionApiService = new TransactionApiService({ baseUrl: API_BASE_URL });
export const transactionsAnalyticsApiService = new TransactionsAnalyticsApiService({
  baseUrl: API_BASE_URL,
});

const authInterceptor = new AuthInterceptor({
  tokenProvider: serverActionTokenProvider,
  refreshUrl: ENDPOINTS.REFRESH_TOKEN,
  getRequestCookieHeader,
  onRefreshResponse: forwardResponseCookieList,
});
authInterceptor.setupOn(authApiService);
authInterceptor.setupOn(categoryApiService);
authInterceptor.setupOn(profileApiService);
authInterceptor.setupOn(recurringTransactionApiService);
authInterceptor.setupOn(transactionApiService);
authInterceptor.setupOn(transactionsAnalyticsApiService);
