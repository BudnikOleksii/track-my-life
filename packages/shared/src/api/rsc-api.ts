import { AuthInterceptor } from './client/interceptors/auth-interceptor';
import { RscTokenProvider } from './client/token/rsc-token-provider';
import { CategoryApiService } from './services/category-api.service';
import { ProfileApiService } from './services/profile-api.service';
import { TransactionApiService } from './services/transaction-api.service';
import { TransactionsAnalyticsApiService } from './services/transactions-analytics-api.service';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:8080';

export const rscCategoryApiService = new CategoryApiService({ baseUrl: API_BASE_URL });
export const rscProfileApiService = new ProfileApiService({ baseUrl: API_BASE_URL });
export const rscTransactionApiService = new TransactionApiService({ baseUrl: API_BASE_URL });
export const rscTransactionsAnalyticsApiService = new TransactionsAnalyticsApiService({
  baseUrl: API_BASE_URL,
});

const rscTokenProvider = new RscTokenProvider();
const rscAuthInterceptor = new AuthInterceptor(
  rscTokenProvider,
  `${API_BASE_URL}/api/auth/refresh-token`,
);
rscAuthInterceptor.setupOn(rscCategoryApiService);
rscAuthInterceptor.setupOn(rscProfileApiService);
rscAuthInterceptor.setupOn(rscTransactionApiService);
rscAuthInterceptor.setupOn(rscTransactionsAnalyticsApiService);
