import {
  LoginRequestDto,
  TokenRefreshRequestDto,
  TokenRefreshResponseDto,
} from '../../types';
import { instance } from '../instance';

export const LoginAPI = async (loginRequest: LoginRequestDto) => {
  const response = await instance({
    method: 'POST',
    url: '/auth/login',
    data: loginRequest,
  });

  console.log(response.data);
  return response.data?.data;
};

export const RefreshAPI = async (
  tokenRefreshRequest: TokenRefreshRequestDto,
) => {
  const response = await instance<TokenRefreshResponseDto>({
    method: 'POST',
    url: '/auth/refresh',
    data: tokenRefreshRequest,
  });

  return response.data;
};
