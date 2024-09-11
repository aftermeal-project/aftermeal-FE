import { ActivityResponseDto } from '../../types';
import { instance } from '../instance';

const url = '/activities';

export const GetActivitiesAPI = async () => {
  const response = await instance<ActivityResponseDto[]>({
    method: 'GET',
    url: url,
  });

  return response.data;
};
