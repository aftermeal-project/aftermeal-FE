import { UserUpdateRequestDto } from '../../types';
import { instance } from '../instance';
import Token from '../utils/token';

const token = new Token();
const accessToken = 'Bearer ' + token.getLocalAccessToken();

const url = '/admin/users';

export const GetUsersAPI = async () => {
  const response = await instance({
    method: 'GET',
    url: url,
  });

  return response.data;
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
