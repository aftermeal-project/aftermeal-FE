import { BaseResponse } from './base';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends BaseResponse {
  data: {
    accessToken: string;
    tokenType: string;
    refreshToken: string;
    eXpiredIn: number;
  };
}
