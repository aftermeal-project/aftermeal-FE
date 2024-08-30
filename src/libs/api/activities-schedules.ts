import { ActivityScheduleListResponseDto } from '../../types';
import { instance } from '../instance';

const url = '/activity-schedules';

export const GetActivitySchedulesAPI = async () => {
  const response = await instance<ActivityScheduleListResponseDto[]>({
    method: 'GET',
    url: url,
  });

  return response.data;
};
