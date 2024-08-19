import { SignupRequest } from '../../types/user';
import { instance } from '../instance';

export const SignupAPI = async (signupRequest: SignupRequest) => {
  if (signupRequest.userType === 'TEACHER') {
    delete signupRequest.generationNumber;
  }

  const response = await instance({
    method: 'POST',
    url: '/v1/users',
    data: signupRequest,
  });

  return response;
};
