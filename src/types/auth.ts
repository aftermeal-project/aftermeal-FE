export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignupRequest extends LoginRequest {
  userType: 'STUDENT' | 'TEACHER';
  name: string;
  generationNumber?: number;
}
