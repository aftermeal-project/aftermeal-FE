import { UserRegistrationRequestDto } from '../../types';
import { instance } from '../instance';

export const SignupAPI = async (
  userRegistationRequest: UserRegistrationRequestDto,
) => {
  if (userRegistationRequest.type === 'TEACHER') {
    delete userRegistationRequest.generationNumber;
  }

  const response = await instance({
    method: 'POST',
    url: '/users',
    data: userRegistationRequest,
  });

  return response;
};
