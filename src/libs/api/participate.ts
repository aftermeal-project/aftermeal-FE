import { instance } from '../instance';
import Token from '../utils/token';

const url = '/activities';
const token = new Token();

export const ParticipateAPI = async (activityId: string) => {
  await instance({
    method: 'POST',
    url: url + `/${activityId}/participate`,
    headers: {
      Authorization: 'Bearer ' + token.getLocalAccessToken(),
    },
    data: {
      activityId: Number(activityId),
    },
  });
};

export const CancelParticipateAPI = async (activityId: string) => {
  await instance({
    method: 'DELETE',
    url: url + `/${activityId}/cancel`,
    headers: {
      Authorization: 'Bearer ' + token.getLocalAccessToken(),
    },
    data: {
      activityId: Number(activityId),
    },
  });
};
