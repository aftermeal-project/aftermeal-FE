import { instance } from '../instance';
import Token from '../utils/token';

const url = '/participations';
const token = new Token();

export const ParticipationAPI = async (activityId: string) => {
  await instance({
    method: 'POST',
    url: url,
    headers: {
      Authorization: 'Bearer ' + token.getLocalAccessToken(),
    },
    data: {
      activityId: Number(activityId),
    },
  });
};

export const CancelParticipationAPI = async (participationId: string) => {
  await instance({
    method: 'DELETE',
    url: url + `/${participationId}`,
    headers: {
      Authorization: 'Bearer ' + token.getLocalAccessToken(),
    },
  });
};

export const CancelUserParticipationAPI = async (participationId: string) => {
  await instance({
    method: 'DELETE',
    url: url + `/${participationId}`,
    headers: {
      Authorization: 'Bearer ' + token.getLocalAccessToken(),
    },
  });
};
