import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../constants';

const url = BASE_URL + '/participations';

export const participationsHandlers = [
  /**
   * 활동 참가 API
   */
  http.post<{}, { activityId: string }>(url, async ({ request }) => {
    const data = await request.json();

    if (Number(data.activityId) === 0) {
      return HttpResponse.json(
        { message: 'Invalid request data' },
        { status: 400 },
      );
    }

    return HttpResponse.json(null, {
      status: 201,
    });
  }),

  /**
   * 활동 참가 취소 API
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
