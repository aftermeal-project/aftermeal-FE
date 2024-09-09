import { ActivityDetailResponseDto } from '../../types';
import { instance } from '../instance';

const url = '/admin/activities';

export const AdminGetActivityDetailsAPI = async (activityId: string) => {
  const response = await instance<ActivityDetailResponseDto>({
    method: 'GET',
    url: url + `/${activityId}`,
  });

  return response.data;
};
