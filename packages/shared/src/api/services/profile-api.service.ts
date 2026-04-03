import type { HTTP_STATUS_CODE } from '../../constants/http-status-code';
import type { FetchCacheOptions } from '../client/types';
import type {
  ChangePasswordDto,
  DeleteAccountDto,
  ProfileControllerChangePasswordResponses,
  ProfileControllerDeleteAccountResponses,
  ProfileControllerGetProfileResponses,
  ProfileControllerUpdateProfileResponses,
  UpdateProfileDto,
} from '../generated/types.gen';

import { ApiClient } from '../client/api-client';

type GetProfileResponse = ProfileControllerGetProfileResponses[typeof HTTP_STATUS_CODE.OK];
type UpdateProfileResponse = ProfileControllerUpdateProfileResponses[typeof HTTP_STATUS_CODE.OK];
type ChangePasswordResponse = ProfileControllerChangePasswordResponses[typeof HTTP_STATUS_CODE.OK];
type DeleteAccountResponse = ProfileControllerDeleteAccountResponses[typeof HTTP_STATUS_CODE.OK];

export class ProfileApiService extends ApiClient {
  private BASE_URL = '/api/profile' as const;
  private ENDPOINTS = {
    PASSWORD: `${this.BASE_URL}/password`,
  } as const;

  fetchProfile(next?: FetchCacheOptions) {
    return this.request<GetProfileResponse>({
      method: 'GET',
      url: this.BASE_URL,
      next,
    });
  }

  updateProfile(body: UpdateProfileDto) {
    return this.request<UpdateProfileResponse>({
      method: 'PATCH',
      url: this.BASE_URL,
      body,
    });
  }

  changePassword(body: ChangePasswordDto) {
    return this.request<ChangePasswordResponse>({
      method: 'POST',
      url: this.ENDPOINTS.PASSWORD,
      body,
    });
  }

  deleteAccount(body: DeleteAccountDto) {
    return this.request<DeleteAccountResponse>({
      method: 'DELETE',
      url: this.BASE_URL,
      body,
    });
  }
}
