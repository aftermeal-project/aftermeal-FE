import { instance } from '../instance';

export const GetUsersAPI = async () => {
  const response = await instance({
    method: 'GET',
    url: '/admin/users',
  });

  return response.data;
};
