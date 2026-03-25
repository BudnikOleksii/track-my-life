import { AuthInterceptor } from './client/interceptors/auth-interceptor';
import { ServerActionTokenProvider } from './client/token/server-action-token-provider';
import { AuthApiService } from './services/auth-api.service';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:8080';

export const serverActionTokenProvider = new ServerActionTokenProvider();

export const authApiService = new AuthApiService({ baseUrl: API_BASE_URL });

const authInterceptor = new AuthInterceptor(
  serverActionTokenProvider,
  `${API_BASE_URL}/api/auth/refresh-token`,
);
authInterceptor.setupOn(authApiService);
