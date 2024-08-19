export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    tokenType: string;
    refreshToken: string;
    eXpiredIn: number;
  };
  message: string;
  success: boolean;
}

export interface SignupRequest extends LoginRequest {
  userType: 'STUDENT' | 'TEACHER';
  name: string;
  generationNumber?: number;
}
