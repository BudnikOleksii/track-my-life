import { API_BASE_URL, ENDPOINTS } from './api-config';
import { AuthInterceptor } from './client/interceptors/auth-interceptor';
import { RscTokenProvider } from './client/token/rsc-token-provider';
import { CategoryApiService } from './services/category-api.service';
import { ProfileApiService } from './services/profile-api.service';
import { RecurringTransactionApiService } from './services/recurring-transaction-api.service';
import { TransactionApiService } from './services/transaction-api.service';
import { TransactionsAnalyticsApiService } from './services/transactions-analytics-api.service';

export const rscCategoryApiService = new CategoryApiService({ baseUrl: API_BASE_URL });
export const rscProfileApiService = new ProfileApiService({ baseUrl: API_BASE_URL });
export const rscRecurringTransactionApiService = new RecurringTransactionApiService({
  baseUrl: API_BASE_URL,
});
export const rscTransactionApiService = new TransactionApiService({ baseUrl: API_BASE_URL });
export const rscTransactionsAnalyticsApiService = new TransactionsAnalyticsApiService({
  baseUrl: API_BASE_URL,
});

const rscTokenProvider = new RscTokenProvider();
const rscAuthInterceptor = new AuthInterceptor({
  tokenProvider: rscTokenProvider,
  refreshUrl: ENDPOINTS.REFRESH_TOKEN,
});
rscAuthInterceptor.setupOn(rscCategoryApiService);
rscAuthInterceptor.setupOn(rscProfileApiService);
rscAuthInterceptor.setupOn(rscRecurringTransactionApiService);
rscAuthInterceptor.setupOn(rscTransactionApiService);
rscAuthInterceptor.setupOn(rscTransactionsAnalyticsApiService);
