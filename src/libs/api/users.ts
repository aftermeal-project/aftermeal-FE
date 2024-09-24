import {
  UserListResponseModel,
  UserRegistrationRequestDto,
  UserUpdateRequestDto,
} from '../../types';
import { instance } from '../instance';
import Token from '../utils/token';

const token = new Token();
const accessToken = 'Bearer ' + token.getLocalAccessToken();

const url = '/users';

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

  return response.data;
};

export const GetUsersAPI = async () => {
  const response = await instance<UserListResponseModel>({
    method: 'GET',
    url: url,
  });

  return response.data?.data;
};

export const UpdateUserAPI = async (
  uesrId: string,
  userUpdateData: UserUpdateRequestDto,
) => {
  await instance({
    method: 'PATCH',
    headers: {
      Authorization: accessToken,
    },
    url: url + `/${uesrId}`,
    data: userUpdateData,
  });
};

export const DeleteUserAPI = async (userId: string) => {
  await instance({
    method: 'DELETE',
    headers: {
      Authorization: accessToken,
    },
    url: url + `/${userId}`,
  });
};
