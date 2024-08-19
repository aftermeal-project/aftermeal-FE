import { LoginRequest } from './auth';

export interface SignupRequest extends LoginRequest {
  userType: 'STUDENT' | 'TEACHER';
  name: string;
  generationNumber?: number;
}
