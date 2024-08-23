import { instance } from '../instance';
import Token from '../utils/token';

const token = new Token();

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
