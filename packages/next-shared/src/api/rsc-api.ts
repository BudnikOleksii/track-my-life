import { API_BASE_URL, ENDPOINTS } from '@track-my-life/shared/src/api/api-config';
import { AuthInterceptor } from '@track-my-life/shared/src/api/client/interceptors/auth-interceptor';
import { CategoryApiService } from '@track-my-life/shared/src/api/services/category-api.service';
import { OnboardingApiService } from '@track-my-life/shared/src/api/services/onboarding-api.service';
import { ProfileApiService } from '@track-my-life/shared/src/api/services/profile-api.service';
import { RecurringTransactionApiService } from '@track-my-life/shared/src/api/services/recurring-transaction-api.service';
import { TransactionApiService } from '@track-my-life/shared/src/api/services/transaction-api.service';
import { TransactionsAnalyticsApiService } from '@track-my-life/shared/src/api/services/transactions-analytics-api.service';

import { RscTokenProvider } from './client/token/rsc-token-provider';

export const rscCategoryApiService = new CategoryApiService({ baseUrl: API_BASE_URL });
export const rscOnboardingApiService = new OnboardingApiService({ baseUrl: API_BASE_URL });
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
rscAuthInterceptor.setupOn(rscOnboardingApiService);
rscAuthInterceptor.setupOn(rscProfileApiService);
rscAuthInterceptor.setupOn(rscRecurringTransactionApiService);
rscAuthInterceptor.setupOn(rscTransactionApiService);
rscAuthInterceptor.setupOn(rscTransactionsAnalyticsApiService);
