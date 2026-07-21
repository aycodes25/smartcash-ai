import { apiClient } from './api';
import type { ParseResponse } from '../types';

export const parseApi = {
  async uploadAndParse(file: File): Promise<ParseResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<ParseResponse>('/parse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
};
