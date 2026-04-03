import type { HTTP_STATUS_CODE } from '../../constants/http-status-code';
import type { FetchCacheOptions } from '../client/types';
import type {
  CreateRecurringTransactionDto,
  RecurringTransactionsControllerCreateResponses,
  RecurringTransactionsControllerDeleteResponses,
  RecurringTransactionsControllerFindAllData,
  RecurringTransactionsControllerFindAllResponses,
  RecurringTransactionsControllerFindByIdResponses,
  RecurringTransactionsControllerPauseResponses,
  RecurringTransactionsControllerResumeResponses,
  RecurringTransactionsControllerUpdateResponses,
  UpdateRecurringTransactionDto,
} from '../generated/types.gen';

import { ApiClient } from '../client/api-client';

type FindAllQuery = RecurringTransactionsControllerFindAllData['query'];
type FindAllResponse = RecurringTransactionsControllerFindAllResponses[typeof HTTP_STATUS_CODE.OK];
type FindByIdResponse =
  RecurringTransactionsControllerFindByIdResponses[typeof HTTP_STATUS_CODE.OK];
type CreateResponse =
  RecurringTransactionsControllerCreateResponses[typeof HTTP_STATUS_CODE.CREATED];
type UpdateResponse = RecurringTransactionsControllerUpdateResponses[typeof HTTP_STATUS_CODE.OK];
type DeleteResponse = RecurringTransactionsControllerDeleteResponses[typeof HTTP_STATUS_CODE.OK];
type PauseResponse = RecurringTransactionsControllerPauseResponses[typeof HTTP_STATUS_CODE.OK];
type ResumeResponse = RecurringTransactionsControllerResumeResponses[typeof HTTP_STATUS_CODE.OK];

export class RecurringTransactionApiService extends ApiClient {
  private BASE_URL = '/api/recurring-transactions' as const;

  private getByIdUrl(id: string) {
    return `${this.BASE_URL}/${id}`;
  }

  fetchRecurringTransactionList(query?: FindAllQuery, next?: FetchCacheOptions) {
    return this.request<FindAllResponse>({
      method: 'GET',
      url: this.BASE_URL,
      query: query as Record<string, unknown>,
      next,
    });
  }

  fetchRecurringTransactionById(id: string, next?: FetchCacheOptions) {
    return this.request<FindByIdResponse>({
      method: 'GET',
      url: this.getByIdUrl(id),
      next,
    });
  }

  createRecurringTransaction(body: CreateRecurringTransactionDto) {
    return this.request<CreateResponse>({
      method: 'POST',
      url: this.BASE_URL,
      body,
    });
  }

  updateRecurringTransaction(id: string, body: UpdateRecurringTransactionDto) {
    return this.request<UpdateResponse>({
      method: 'PATCH',
      url: this.getByIdUrl(id),
      body,
    });
  }

  deleteRecurringTransaction(id: string) {
    return this.request<DeleteResponse>({
      method: 'DELETE',
      url: this.getByIdUrl(id),
    });
  }

  pauseRecurringTransaction(id: string) {
    return this.request<PauseResponse>({
      method: 'PATCH',
      url: `${this.getByIdUrl(id)}/pause`,
    });
  }

  resumeRecurringTransaction(id: string) {
    return this.request<ResumeResponse>({
      method: 'PATCH',
      url: `${this.getByIdUrl(id)}/resume`,
    });
  }
}
