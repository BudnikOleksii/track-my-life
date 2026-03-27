import type {
  CreateCategoryDto,
  TransactionCategoriesControllerCreateResponses,
  TransactionCategoriesControllerDeleteResponses,
  TransactionCategoriesControllerFindAllData,
  TransactionCategoriesControllerFindAllResponses,
  TransactionCategoriesControllerFindByIdResponses,
  TransactionCategoriesControllerUpdateResponses,
  UpdateCategoryDto,
} from '../generated/types.gen';

import type { HTTP_STATUS_CODE } from '../../constants/http-status-code';
import { ApiClient } from '../client/api-client';

type FindAllQuery = TransactionCategoriesControllerFindAllData['query'];
type FindAllResponse = TransactionCategoriesControllerFindAllResponses[typeof HTTP_STATUS_CODE.OK];
type FindByIdResponse =
  TransactionCategoriesControllerFindByIdResponses[typeof HTTP_STATUS_CODE.OK];
type CreateResponse =
  TransactionCategoriesControllerCreateResponses[typeof HTTP_STATUS_CODE.CREATED];
type UpdateResponse = TransactionCategoriesControllerUpdateResponses[typeof HTTP_STATUS_CODE.OK];
type DeleteResponse = TransactionCategoriesControllerDeleteResponses[typeof HTTP_STATUS_CODE.OK];

export class CategoryApiService extends ApiClient {
  private BASE_URL = '/api/transaction-categories' as const;

  private getByIdUrl(id: string) {
    return `${this.BASE_URL}/${id}`;
  }

  fetchCategoryList(query?: FindAllQuery) {
    return this.request<FindAllResponse>({
      method: 'GET',
      url: this.BASE_URL,
      query: query as Record<string, unknown>,
    });
  }

  fetchCategoryById(id: string) {
    return this.request<FindByIdResponse>({
      method: 'GET',
      url: this.getByIdUrl(id),
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
}
