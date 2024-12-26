import {
  ActivityCreationRequestDto,
  ActivityListResponseDto,
  ActivityListResponseDtoType,
  ActivityListResponseModel,
} from '../../types';
import { instance } from '../instance';
import Token from '../utils/token';

const token = new Token();

const url = '/activities';
const accessToken = 'Bearer ' + token.getLocalAccessToken();

export const GetActivitiesAPI = async (
  scheduledDate?: string,
  type?: ActivityListResponseDtoType,
) => {
  const params = new URLSearchParams();

  if (scheduledDate) {
    params.append('scheduledDate', scheduledDate);
  }

  if (type) {
    params.append('type', type);
  }

  const response = await instance<ActivityListResponseModel>({
    method: 'GET',
    url: `${url}?${params.toString()}`,
  });

  return response.data?.data;
};

export const CreateActivityAPI = async (
  createActivityData: ActivityCreationRequestDto,
) => {
  await instance({
    method: 'POST',
    headers: {
      Authorization: accessToken,
    },
    url: url,
    data: createActivityData,
  });
};

export const UpdateActivityAPI = async (
  activityUpdateData: ActivityListResponseDto,
) => {
  const { id, currentParticipants, ...rest } = activityUpdateData;

  await instance({
    method: 'PATCH',
    headers: {
      Authorization: accessToken,
    },
    url: url + `/${id}`,
    data: rest,
  });
};

export const DeleteActivityAPI = async (activityId: string) => {
  await instance({
    method: 'DELETE',
    headers: {
      Authorization: accessToken,
    },
    url: url + `/${activityId}`,
  });
};
