import { apiClient } from './api';
import type { Transaction } from '../types';

export const exportApi = {
  async exportExcel(transactions: Transaction[]): Promise<Blob> {
    const response = await apiClient.post('/export', { transactions }, {
      responseType: 'blob'
    });
    return response.data;
  }
};
