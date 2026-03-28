import { AuthInterceptor } from './client/interceptors/auth-interceptor';
import { ServerActionTokenProvider } from './client/token/server-action-token-provider';
import { AuthApiService } from './services/auth-api.service';
import { CategoryApiService } from './services/category-api.service';
import { ProfileApiService } from './services/profile-api.service';
import { TransactionApiService } from './services/transaction-api.service';
import { TransactionsAnalyticsApiService } from './services/transactions-analytics-api.service';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:8080';

export const serverActionTokenProvider = new ServerActionTokenProvider();

export const authApiService = new AuthApiService({ baseUrl: API_BASE_URL });
export const categoryApiService = new CategoryApiService({ baseUrl: API_BASE_URL });
export const profileApiService = new ProfileApiService({ baseUrl: API_BASE_URL });
export const transactionApiService = new TransactionApiService({ baseUrl: API_BASE_URL });
export const transactionsAnalyticsApiService = new TransactionsAnalyticsApiService({
  baseUrl: API_BASE_URL,
});

const authInterceptor = new AuthInterceptor(
  serverActionTokenProvider,
  `${API_BASE_URL}/api/auth/refresh-token`,
);
authInterceptor.setupOn(authApiService);
authInterceptor.setupOn(categoryApiService);
authInterceptor.setupOn(profileApiService);
authInterceptor.setupOn(transactionApiService);
authInterceptor.setupOn(transactionsAnalyticsApiService);
