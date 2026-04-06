import type { HTTP_STATUS_CODE } from '../../constants/http-status-code';
import type { FetchCacheOptions } from '../client/types';
import type {
  TransactionsAnalyticsControllerGetCategoryBreakdownData,
  TransactionsAnalyticsControllerGetCategoryBreakdownResponses,
  TransactionsAnalyticsControllerGetDailySpendingData,
  TransactionsAnalyticsControllerGetDailySpendingResponses,
  TransactionsAnalyticsControllerGetSummaryData,
  TransactionsAnalyticsControllerGetSummaryResponses,
  TransactionsAnalyticsControllerGetTopCategoriesData,
  TransactionsAnalyticsControllerGetTopCategoriesResponses,
  TransactionsAnalyticsControllerGetTrendsData,
  TransactionsAnalyticsControllerGetTrendsResponses,
} from '../generated/types.gen';

import { ApiClient } from '../client/api-client';

type SummaryQuery = TransactionsAnalyticsControllerGetSummaryData['query'];
type SummaryResponse =
  TransactionsAnalyticsControllerGetSummaryResponses[typeof HTTP_STATUS_CODE.OK];

type CategoryBreakdownQuery = TransactionsAnalyticsControllerGetCategoryBreakdownData['query'];
type CategoryBreakdownResponse =
  TransactionsAnalyticsControllerGetCategoryBreakdownResponses[typeof HTTP_STATUS_CODE.OK];

type TrendsQuery = TransactionsAnalyticsControllerGetTrendsData['query'];
type TrendsResponse = TransactionsAnalyticsControllerGetTrendsResponses[typeof HTTP_STATUS_CODE.OK];

type TopCategoriesQuery = TransactionsAnalyticsControllerGetTopCategoriesData['query'];
type TopCategoriesResponse =
  TransactionsAnalyticsControllerGetTopCategoriesResponses[typeof HTTP_STATUS_CODE.OK];

type DailySpendingQuery = TransactionsAnalyticsControllerGetDailySpendingData['query'];
type DailySpendingResponse =
  TransactionsAnalyticsControllerGetDailySpendingResponses[typeof HTTP_STATUS_CODE.OK];

export class TransactionsAnalyticsApiService extends ApiClient {
  private BASE_URL = '/api/transactions-analytics' as const;
  private ENDPOINTS = {
    SUMMARY: `${this.BASE_URL}/summary`,
    CATEGORY_BREAKDOWN: `${this.BASE_URL}/category-breakdown`,
    TRENDS: `${this.BASE_URL}/trends`,
    TOP_CATEGORIES: `${this.BASE_URL}/top-categories`,
    DAILY_SPENDING: `${this.BASE_URL}/daily-spending`,
  } as const;

  fetchSummary(query: SummaryQuery, next?: FetchCacheOptions) {
    return this.request<SummaryResponse>({
      method: 'GET',
      url: this.ENDPOINTS.SUMMARY,
      query,
      next,
    });
  }

  fetchCategoryBreakdown(query: CategoryBreakdownQuery, next?: FetchCacheOptions) {
    return this.request<CategoryBreakdownResponse>({
      method: 'GET',
      url: this.ENDPOINTS.CATEGORY_BREAKDOWN,
      query,
      next,
    });
  }

  fetchTrends(query: TrendsQuery, next?: FetchCacheOptions) {
    return this.request<TrendsResponse>({
      method: 'GET',
      url: this.ENDPOINTS.TRENDS,
      query,
      next,
    });
  }

  fetchTopCategories(query: TopCategoriesQuery, next?: FetchCacheOptions) {
    return this.request<TopCategoriesResponse>({
      method: 'GET',
      url: this.ENDPOINTS.TOP_CATEGORIES,
      query,
      next,
    });
  }

  fetchDailySpending(query: DailySpendingQuery, next?: FetchCacheOptions) {
    return this.request<DailySpendingResponse>({
      method: 'GET',
      url: this.ENDPOINTS.DAILY_SPENDING,
      query,
      next,
    });
  }
}
