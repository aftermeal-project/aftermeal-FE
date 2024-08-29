import { LoginRequest, LoginResponse } from '../../types/auth';
import { TokenRefreshRequestDto, TokenRefreshResponseDto } from '../../types';
import { instance } from '../instance';

export const LoginAPI = async (loginRequest: LoginRequest) => {
  const response = await instance<LoginResponse>({
    method: 'POST',
    url: '/v1/auth/login',
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
