import { instance } from '../instance';
import Token from '../utils/token';

const url = '/activities/:activityId';
const token = new Token();

export const ParticipateAPI = async (activityId: string) => {
  await instance({
    method: 'POST',
    url: url + '/participate',
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
    url: url + '/cancel',
    headers: {
      Authorization: 'Bearer ' + token.getLocalAccessToken(),
    },
    data: {
      activityId: Number(activityId),
    },
  });
};
