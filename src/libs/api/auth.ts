import { LoginRequest, LoginResponse } from '../../types/auth';
import { instance } from '../instance';

export const LoginAPI = async (loginRequest: LoginRequest) => {
  const response = await instance<LoginResponse>({
    method: 'POST',
    url: '/v1/auth/login',
    data: loginRequest,
  });

  return response.data;
};
