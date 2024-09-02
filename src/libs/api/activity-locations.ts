import { ActivityLocationListResponseDto } from '../../types';
import { instance } from '../instance';

const url = '/admin/activity-locations';

export const GetActivityLocationAPI = async () => {
  const response = await instance<ActivityLocationListResponseDto[]>({
    method: 'GET',
    url: url,
  });

  return response.data;
};
