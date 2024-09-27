import { ActivityDetailResponseModel } from '../../types';
import { instance } from '../instance';

const url = '/activities';

export const GetActivityDetailsAPI = async (activityId: string) => {
  const response = await instance<ActivityDetailResponseModel>({
    method: 'GET',
    url: url + `/${activityId}`,
  });

  return response.data?.data;
};
