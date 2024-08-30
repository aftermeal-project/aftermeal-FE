import {
  LoginRequestDto,
  LoginResponseDto,
  TokenRefreshRequestDto,
  TokenRefreshResponseDto,
} from '../../types';
import { instance } from '../instance';

export const LoginAPI = async (loginRequest: LoginRequestDto) => {
  const response = await instance<LoginResponseDto>({
    method: 'POST',
    url: '/auth/login',
    data: loginRequest,
  });

  return response.data;
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
