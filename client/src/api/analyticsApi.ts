import { apiClient } from './api';
import type { Transaction, DashboardAnalyticsResponse } from '../types';

export const analyticsApi = {
  async getDashboardAnalytics(transactions: Transaction[]): Promise<DashboardAnalyticsResponse> {
    const response = await apiClient.post<{ success: boolean; analytics: DashboardAnalyticsResponse }>(
      '/api/dashboard/analytics',
      { transactions }
    );
    return response.data.analytics;
  }
};
