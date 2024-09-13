import axios, { AxiosError } from 'axios';
import { RefreshAPI } from './api/auth';
import Token from './utils/token';
import { BASE_URL } from '../constants';

const token = new Token();

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': true,
  },
});

async function refreshAuthToken() {
  const refreshToken = token.getLocalRefreshToken();

  try {
    return await RefreshAPI(refreshToken);
  } catch (error) {
    throw new Error('Failed to refresh auth token');
  }
}

function axiosErrorHandler(error: unknown) {
  if (error instanceof AxiosError) {
    const { response } = error;

    if (response?.status === 500) {
      alert('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    } else if (error instanceof Error && error.message === 'timeout') {
      alert('요청 시간이 초과되었습니다. 다시 시도해 주세요.');
    }
  }

  return Promise.reject(error);
}

instance.interceptors.request.use(
  config => {
    const accessToken = token.getLocalAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

let authTokenRequest: Promise<any> | null = null;

function redirectTo(path: string) {
  window.history.pushState({}, '', path);
  window.location.reload();
}

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

    return axiosErrorHandler(error);
  },
);
