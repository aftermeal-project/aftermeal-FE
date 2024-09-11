import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../../constants';

const url = `${BASE_URL}/activities`;

export const participateHandlers = [
  /**
   * 활동 참가 API
   */
  http.post<{ activityId: string }, {}>(
    `${url}/:activityId/participate`,
    async ({ params }) => {
      if (Number(params.activityId) === 0) {
        return HttpResponse.json(
          { message: 'Invalid request data' },
          { status: 400 },
        );
      }
      return HttpResponse.json(null, {
        status: 201,
      });
    },
  ),

  /**
   * 활동 참가 취소 API
   */
  http.delete<{ activityId: string }, {}>(
    `${url}/:activityId/cancel`,
    async ({ params }) => {
      if (Number(params.activityId) === 0) {
        return HttpResponse.json(
          { message: 'Invalid request data' },
          { status: 400 },
        );
      }
      return HttpResponse.json(null, {
        status: 204,
      });
    },
  ),
];
