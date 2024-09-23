import { ActivityCreationRequestDto, ActivityResponseDto } from '../../types';
import { instance } from '../instance';
import Token from '../utils/token';

const token = new Token();

const url = '/activities';
const accessToken = 'Bearer ' + token.getLocalAccessToken();

export const GetActivitiesAPI = async () => {
  const response = await instance({
    method: 'GET',
    url: url,
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
  activityUpdateData: ActivityResponseDto,
) => {
  const { id, currentParticipants, ...rest } = activityUpdateData;

  await instance({
    method: 'PUT',
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
