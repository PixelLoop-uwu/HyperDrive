import axios from 'axios';
import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';


type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};


const envBase = import.meta.env?.VITE_API_URL;
const isDev = import.meta.env?.DEV;
const resolvedBaseURL = isDev ? '/v1' : (envBase || '/v1');

export const api = axios.create({
  baseURL: resolvedBaseURL,
  withCredentials: true,
});

const isAuthPath = (url?: string) =>
  typeof url === 'string' && /\/auth\/(login|refresh|logout)(\b|\/|\?|#)/.test(url);


api.interceptors.request.use((config) => {
  const url = typeof config.url === 'string' ? config.url : '';
  const isAuthEndpoint = isAuthPath(url);
  const token = useAuthStore.getState().sessionToken;
  if (!isAuthEndpoint && token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    const isAuthEndpoint = isAuthPath(originalRequest?.url);

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        const newToken = await useAuthStore.getState().refresh();

        if (newToken) {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`
          } as AxiosRequestHeaders;
          return api(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);