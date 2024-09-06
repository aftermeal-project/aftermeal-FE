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

export const DeleteUserAPI = async (userId: string) => {
  await instance({
    method: 'DELETE',
    headers: {
      Authorization: accessToken,
    },
    url: url + `/${userId}`,
  });
};
