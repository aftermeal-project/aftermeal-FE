import { instance } from '../instance';
import Token from '../utils/token';

const url = '/admin/participations';
const token = new Token();

export const CancelUserParticipationAPI = async (participationId: string) => {
  await instance({
    method: 'DELETE',
    url: url + `/${participationId}`,
    headers: {
      Authorization: 'Bearer ' + token.getLocalAccessToken(),
    },
  });
};
