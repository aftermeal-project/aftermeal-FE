import { ActivityCreationRequestDto, ActivityResponseDto } from '../../types';
import { instance } from '../instance';

const url = '/activities';

export const GetActivitiesAPI = async () => {
  const response = await instance<ActivityResponseDto[]>({
    method: 'GET',
    url: url,
  });

  return response.data;
};

export const CreateActivityAPI = async (
  createActivityData: ActivityCreationRequestDto,
) => {
  const response = await instance({
    method: 'POST',
    url: url,
    data: createActivityData,
  });

  return response.data;
};

export const UpdateActivityAPI = async (
  activityUpdateData: ActivityResponseDto,
) => {
  const { id, ...rest } = activityUpdateData;

  await instance({
    method: 'PUT',
    url: url + `/${id}`,
    data: rest,
  });
};

export const DeleteActivityAPI = async (activityId: string) => {
  await instance({
    method: 'DELETE',
    url: url + `/${activityId}`,
  });
};
