import { LoginRequest, LoginResponse } from '../../types/auth';
import { instance } from '../instance';
import Token from '../utils/token';

const token = new Token();

export const LoginAPI = async (loginRequest: LoginRequest) => {
  const response = await instance<LoginResponse>({
    method: 'POST',
    url: '/v1/auth/login',
    data: loginRequest,
  });

  return response.data;
};

export const RefreshAPI = async () => {
  const response = await instance<LoginResponse>({
    method: 'POST',
    url: '/v1/auth/refresh',
    data: {
      refreshToken: token.getLocalRefreshToken(),
    },
  });

  return response.data;
};
