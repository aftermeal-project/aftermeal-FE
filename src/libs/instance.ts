import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants/url';
import token from './utils/token';
import { RefreshAPI } from './api/auth';

let authTokenRequest: Promise<any> | null = null;

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': true,
  },
});

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

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error instanceof AxiosError) {
      if (!error.response) {
        alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.');
        return Promise.reject(error);
      }
    } else if (error instanceof Error && error.message === 'timeout') {
      alert('요청 시간이 초과되었습니다. 다시 시도해 주세요.');
    } else {
      alert('예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    }

    const { config, response } = error;
    const originalRequest = config;

    if (response.status === 401 && !originalRequest.__isRetryRequest) {
      if (!authTokenRequest) {
        originalRequest.__isRetryRequest = true;
        authTokenRequest = refreshAuthToken();
      }

      try {
        const newAuthTokenResponse = await authTokenRequest;
        console.log('이건 기초적인 임플란트다.');
        token.setUser(newAuthTokenResponse);
        return instance(originalRequest);
      } catch (refreshError) {
        token.removeUser();
        window.location.replace('/login');
        return Promise.reject(refreshError);
      } finally {
        authTokenRequest = null;
      }
    }

    return Promise.reject(error);
  },
);

async function refreshAuthToken() {
  try {
    return await RefreshAPI();
  } catch (error) {
    throw new Error('Failed to refresh auth token');
  }
}
