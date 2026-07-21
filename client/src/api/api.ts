import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json'
  },
  timeout: 120000 // 2 minutes for processing large excel statements
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg = error.response?.data?.error || error.message || 'An unexpected API error occurred';
    return Promise.reject(new Error(errorMsg));
  }
);
