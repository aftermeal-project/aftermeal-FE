import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../constants';
import { ActivityCreationRequestDto, ActivityResponseDto } from '../types';
import { createRandomActivity } from './utils/activities.utils';

const url = BASE_URL + '/admin/activities';

export const adminActivitiesHandlers = [
  /**
   * 활동 목록 조회 API
   */

  http.get<{}, {}, ActivityResponseDto[]>(url, async () => {
    const data = Array.from({ length: 5 }, () => createRandomActivity());

    return HttpResponse.json(data);
  }),

  /**
   * 활동 생성 API
   */

  http.post<{}, ActivityCreationRequestDto>(url, async ({ request }) => {
    const data = await request.json();

    if (!data.title || data.maxParticipants <= 0 || !data.location) {
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
   * 활동 수정 API
   */
  http.put<
    { activityId: string },
    Omit<ActivityResponseDto, 'currentParticipants'>,
    {}
  >(url + '/:activityId', async ({ request, params }) => {
    const data = await request.json();

    if (!data.title || Number(data.maxParticipants) <= 0 || !data.location) {
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
   * 활동 삭제 API
   */
  http.delete<{ activityId: string }>(
    url + '/:activityId',
    async ({ params }) => {
      if (params.activityId !== '0') {
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
];
