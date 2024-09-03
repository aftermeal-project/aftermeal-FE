import { ActivityLocationListResponseDto } from '../../types';
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
