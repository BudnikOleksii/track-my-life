import type { HTTP_STATUS_CODE } from '../../constants/http-status-code';
import type { FetchCacheOptions } from '../client/types';
import type {
  CreateTransactionDto,
  TransactionsControllerCreateResponses,
  TransactionsControllerDeleteResponses,
  TransactionsControllerExportTransactionsData,
  TransactionsControllerFindAllData,
  TransactionsControllerFindAllResponses,
  TransactionsControllerFindByCategoryResponses,
  TransactionsControllerFindByIdResponses,
  TransactionsControllerImportTransactionsResponses,
  TransactionsControllerUpdateResponses,
  UpdateTransactionDto,
} from '../generated/types.gen';

import { ApiClient } from '../client/api-client';

type ExportQuery = TransactionsControllerExportTransactionsData['query'];
type FindAllQuery = TransactionsControllerFindAllData['query'];
type FindAllResponse = TransactionsControllerFindAllResponses[typeof HTTP_STATUS_CODE.OK];
type FindByIdResponse = TransactionsControllerFindByIdResponses[typeof HTTP_STATUS_CODE.OK];
type CreateResponse = TransactionsControllerCreateResponses[typeof HTTP_STATUS_CODE.CREATED];
type UpdateResponse = TransactionsControllerUpdateResponses[typeof HTTP_STATUS_CODE.OK];
type DeleteResponse = TransactionsControllerDeleteResponses[typeof HTTP_STATUS_CODE.OK];
type FindByCategoryResponse =
  TransactionsControllerFindByCategoryResponses[typeof HTTP_STATUS_CODE.OK];
type ImportResponse =
  TransactionsControllerImportTransactionsResponses[typeof HTTP_STATUS_CODE.CREATED];

export class TransactionApiService extends ApiClient {
  private BASE_URL = '/api/transactions' as const;

  private getByIdUrl(id: string) {
    return `${this.BASE_URL}/${id}`;
  }

  fetchTransactionList(query?: FindAllQuery, next?: FetchCacheOptions) {
    return this.request<FindAllResponse>({
      method: 'GET',
      url: this.BASE_URL,
      query,
      next,
    });
  }

  fetchTransactionById(id: string, next?: FetchCacheOptions) {
    return this.request<FindByIdResponse>({
      method: 'GET',
      url: this.getByIdUrl(id),
      next,
    });
  }

  createTransaction(body: CreateTransactionDto) {
    return this.request<CreateResponse>({
      method: 'POST',
      url: this.BASE_URL,
      body,
    });
  }

  updateTransaction(id: string, body: UpdateTransactionDto) {
    return this.request<UpdateResponse>({
      method: 'PATCH',
      url: this.getByIdUrl(id),
      body,
    });
  }

  deleteTransaction(id: string) {
    return this.request<DeleteResponse>({
      method: 'DELETE',
      url: this.getByIdUrl(id),
    });
  }

  fetchTransactionsByCategory(categoryId: string, next?: FetchCacheOptions) {
    return this.request<FindByCategoryResponse>({
      method: 'GET',
      url: `${this.BASE_URL}/by-category/${encodeURIComponent(categoryId)}`,
      next,
    });
  }

  exportTransactionList(query: ExportQuery) {
    return this.requestBlob({
      method: 'GET',
      url: `${this.BASE_URL}/export`,
      query,
    });
  }

  importTransactionList(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.requestFormData<ImportResponse>({
      method: 'POST',
      url: `${this.BASE_URL}/import`,
      formData,
    });
  }
}
