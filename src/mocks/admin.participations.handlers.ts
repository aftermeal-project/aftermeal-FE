import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../constants';

const url = BASE_URL + '/admin/participations';

export const adminParticipationsHandlers = [
  /**
   * 특정 유저 활동 참가 취소 API
   */
  http.delete<{ participationId: string }, {}>(
    url + '/:participationId',

    async ({ params }) => {
      if (Number(params.participationId) === 0) {
        return HttpResponse.json(
          { message: 'Invalid request data' },
          { status: 400 },
        );
      }

      return new Response(null, { status: 204 });
    },
  ),
];
