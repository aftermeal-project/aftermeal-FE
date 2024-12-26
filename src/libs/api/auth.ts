import {
  EmailVerifyRequestDto,
  LoginRequestDto,
  TokenRefreshRequestDto,
  TokenRefreshResponseModel,
} from '../../types';
import { instance } from '../instance';

export const LoginAPI = async (loginRequest: LoginRequestDto) => {
  const response = await instance({
    method: 'POST',
    url: '/auth/login',
    data: loginRequest,
  });

  return response.data?.data;
};

export const RefreshAPI = async (
  tokenRefreshRequest: TokenRefreshRequestDto,
) => {
  const response = await instance<TokenRefreshResponseModel>({
    method: 'POST',
    url: '/auth/refresh',
    data: {
      refreshToken: String(tokenRefreshRequest),
    },
  });

  return response.data?.data;
};

export const EmailVerifyAPI = async (
  emailVerifyRequest: EmailVerifyRequestDto,
) => {
  const response = await instance({
    method: 'POST',
    url: '/auth/email-verify',
    data: emailVerifyRequest,
  });

  return response.data?.data;
};
