import { instance } from '../instance';
import token from '../utils/token';

export const ParticipationAPI = async (activityId: string) => {
  const response = await instance({
    method: 'POST',
    url: '/v1/participation',
    headers: {
      Authorization: 'Bearer ' + token.getLocalAccessToken(),
    },
    data: {
      activityId: Number(activityId),
    },
  });

  return response;
};
