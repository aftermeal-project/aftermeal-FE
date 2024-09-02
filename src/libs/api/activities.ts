import {
  ActivityCreationRequestDto,
  ActivityResponseDto,
  ActivityUpdateRequestDto,
} from '../../types';
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

export const EditActivityAPI = async (
  activityUpdateData: ActivityUpdateRequestDto,
) => {
  const response = await instance({
    method: 'PUT',
    url: url,
    data: activityUpdateData,
  });

  return response.data;
};

export const DeleteActivityAPI = async (activityId: string) => {
  const response = await instance({
    method: 'DELETE',
    url: url,
    params: activityId,
  });

  return response.data;
};
