import axios, { AxiosError } from 'axios';
import { RefreshAPI } from './api/auth';
import Token from './utils/token';
import { BASE_URL } from '../constants';
import { HTTPError } from './utils/http-error';
import { ErrorResponseData } from '../types';

const token = new Token();

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': true,
  },
});

instance.interceptors.request.use(
  config => {
    const accessToken = token.getLocalAccessToken();

    if (accessToken && config.url !== '/auth/refresh') {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

async function refreshAuthToken() {
  const refreshToken = token.getLocalRefreshToken();

  try {
    return await RefreshAPI(refreshToken);
  } catch {
    throw new Error('Failed to refresh auth token');
  }
}

function redirectTo(path: string) {
  window.history.pushState({}, '', path);
  window.location.reload();
}

function handleAPIError(error: AxiosError<ErrorResponseData>) {
  if (!error.response) throw error;

  if (error.message === 'timeout') {
    alert('요청 시간이 초과되었습니다. 다시 시도해 주세요.');
  }

  const { status, data } = error.response;
  const errorMessage = data.message ? data.message : '알 수 없는 오류입니다.';

  throw new HTTPError(status, errorMessage);
}

let authTokenRequest: Promise<any> | null = null;

instance.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error;
    const originalRequest = config;
    const currentPath = window.location.pathname;

    if (!response && currentPath !== '/') {
      alert('네트워크 오류가 발생했습니다. 네트워크 연결 상태를 확인해주세요.');
      return;
    }

    if (response.status === 401 && !originalRequest.__isRetryRequest) {
      if (!authTokenRequest) {
        originalRequest.__isRetryRequest = true;
        authTokenRequest = refreshAuthToken();
      }

      try {
        const newToken = await authTokenRequest;
        token.setUser(newToken);
        return instance(originalRequest);
      } catch (refreshError) {
        token.removeUser();
        redirectTo('/login');
        return Promise.reject(refreshError);
      } finally {
        authTokenRequest = null;
      }
    }

    return handleAPIError(error);
  },
);
