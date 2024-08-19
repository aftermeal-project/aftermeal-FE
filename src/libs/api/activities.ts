import { GetActivitiesResponse } from '../../types/activities';
import { instance } from '../instance';

export const GetActivitiesAPI = async () => {
  const response = await instance<GetActivitiesResponse>({
    method: 'GET',
    url: '/v1/activities',
  });

  return response.data;
};
