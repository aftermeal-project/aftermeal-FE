import {
  ActivityLocationCreationRequestDto,
  ActivityLocationListResponseDto,
} from '../../types';
import { instance } from '../instance';
import Token from '../utils/token';

const token = new Token();

const url = '/admin/activity-locations';
const accessToken = 'Bearer ' + token.getLocalAccessToken();

export const GetActivityLocationAPI = async () => {
  const response = await instance<ActivityLocationListResponseDto[]>({
    method: 'GET',
    headers: {
      Authorization: accessToken,
    },
    url: url,
  });

  return response.data;
};

export const CreateActivityLocationAPI = async (
  createActivityLocationData: ActivityLocationCreationRequestDto,
) => {
  await instance({
    method: 'POST',
    headers: {
      Authorization: accessToken,
    },
    url: url,
    data: createActivityLocationData,
  });
};

export const UpdateActivityLocationAPI = async (
  locationId: string,
  name: string,
) => {
  await instance({
    method: 'PATCH',
    headers: {
      Authorization: accessToken,
    },
    url: url + `/${locationId}`,
    data: {
      name: name,
    },
  });
};

export const DeleteActivityLocationAPI = async (locationId: string) => {
  await instance({
    method: 'DELETE',
    headers: {
      Authorization: accessToken,
    },
    url: url + `/${locationId}`,
  });
};
