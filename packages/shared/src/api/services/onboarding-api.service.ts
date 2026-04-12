import type { HTTP_STATUS_CODE } from '../../constants/http-status-code';
import type { FetchCacheOptions } from '../client/types';
import type {
  CompleteOnboardingDto,
  OnboardingControllerAssignDefaultCategoriesResponses,
  OnboardingControllerCompleteResponses,
  OnboardingControllerGetStatusResponses,
} from '../generated/types.gen';

import { ApiClient } from '../client/api-client';

type GetStatusResponse = OnboardingControllerGetStatusResponses[typeof HTTP_STATUS_CODE.OK];
type CompleteResponse = OnboardingControllerCompleteResponses[typeof HTTP_STATUS_CODE.OK];
type AssignDefaultCategoriesResponse =
  OnboardingControllerAssignDefaultCategoriesResponses[typeof HTTP_STATUS_CODE.OK];

export class OnboardingApiService extends ApiClient {
  private BASE_URL = '/api/onboarding' as const;
  private ENDPOINTS = {
    STATUS: `${this.BASE_URL}/status`,
    COMPLETE: `${this.BASE_URL}/complete`,
    ASSIGN_DEFAULT_CATEGORIES: `${this.BASE_URL}/assign-default-categories`,
  } as const;

  fetchStatus(next?: FetchCacheOptions) {
    return this.request<GetStatusResponse>({
      method: 'GET',
      url: this.ENDPOINTS.STATUS,
      next,
    });
  }

  complete(body: CompleteOnboardingDto) {
    return this.request<CompleteResponse>({
      method: 'POST',
      url: this.ENDPOINTS.COMPLETE,
      body,
    });
  }

  assignDefaultCategories() {
    return this.request<AssignDefaultCategoriesResponse>({
      method: 'POST',
      url: this.ENDPOINTS.ASSIGN_DEFAULT_CATEGORIES,
    });
  }
}
