import type { HTTP_STATUS_CODE } from '../../constants/http-status-code';
import type { FetchCacheOptions } from '../client/types';
import type {
  CreateCategoryDto,
  TransactionCategoriesControllerBulkDeleteResponses,
  TransactionCategoriesControllerCreateResponses,
  TransactionCategoriesControllerDeleteResponses,
  TransactionCategoriesControllerFindAllData,
  TransactionCategoriesControllerFindAllResponses,
  TransactionCategoriesControllerFindByIdResponses,
  TransactionCategoriesControllerUpdateResponses,
  UpdateCategoryDto,
} from '../generated/types.gen';

import { ApiClient } from '../client/api-client';

type FindAllQuery = TransactionCategoriesControllerFindAllData['query'];
type FindAllResponse = TransactionCategoriesControllerFindAllResponses[typeof HTTP_STATUS_CODE.OK];
type FindByIdResponse =
  TransactionCategoriesControllerFindByIdResponses[typeof HTTP_STATUS_CODE.OK];
type CreateResponse =
  TransactionCategoriesControllerCreateResponses[typeof HTTP_STATUS_CODE.CREATED];
type UpdateResponse = TransactionCategoriesControllerUpdateResponses[typeof HTTP_STATUS_CODE.OK];
type DeleteResponse = TransactionCategoriesControllerDeleteResponses[typeof HTTP_STATUS_CODE.OK];
type BulkDeleteResponse =
  TransactionCategoriesControllerBulkDeleteResponses[typeof HTTP_STATUS_CODE.OK];

export class CategoryApiService extends ApiClient {
  private BASE_URL = '/api/transaction-categories' as const;

  private getByIdUrl(id: string) {
    return `${this.BASE_URL}/${id}`;
  }

  fetchCategoryList(query?: FindAllQuery, next?: FetchCacheOptions) {
    return this.request<FindAllResponse>({
      method: 'GET',
      url: this.BASE_URL,
      query,
      next,
    });
  }

  fetchCategoryById(id: string, next?: FetchCacheOptions) {
    return this.request<FindByIdResponse>({
      method: 'GET',
      url: this.getByIdUrl(id),
      next,
    });
  }

  createCategory(body: CreateCategoryDto) {
    return this.request<CreateResponse>({
      method: 'POST',
      url: this.BASE_URL,
      body,
    });
  }

  updateCategory(id: string, body: UpdateCategoryDto) {
    return this.request<UpdateResponse>({
      method: 'PATCH',
      url: this.getByIdUrl(id),
      body,
    });
  }

  deleteCategory(id: string) {
    return this.request<DeleteResponse>({
      method: 'DELETE',
      url: this.getByIdUrl(id),
    });
  }

  bulkDelete(idList: string[]) {
    return this.request<BulkDeleteResponse>({
      method: 'DELETE',
      url: `${this.BASE_URL}/batch`,
      body: { ids: idList },
    });
  }
}
