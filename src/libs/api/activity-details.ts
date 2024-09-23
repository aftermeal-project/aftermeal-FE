import { ActivityDetailResponseDto } from '../../types';
import { instance } from '../instance';

const url = '/activities';

export const GetActivityDetailsAPI = async (activityId: string) => {
  const response = await instance<ActivityDetailResponseDto>({
    method: 'GET',
    url: url + `/${activityId}`,
  });

  return response.data || [];
};
