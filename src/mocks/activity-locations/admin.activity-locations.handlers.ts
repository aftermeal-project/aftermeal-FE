import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../../constants';
import {
  ActivityLocationCreationRequestDto,
  ActivityLocationListResponseDto,
} from '../../types';
import { createRandomActivityLocation } from '../utils/activity-locations.utils';

const url = BASE_URL + '/admin/activity-locations';

export const adminActivityLocationsHandlers = [
  /**
   * 활동 장소 조회 API
   */
  http.get<{}, {}, ActivityLocationListResponseDto[]>(url, async () => {
    const data = Array.from({ length: 5 }, () =>
      createRandomActivityLocation(),
    );

    return HttpResponse.json(data);
  }),

  /**
   * 활동 장소 생성 API
   */
  http.post<{}, ActivityLocationCreationRequestDto>(
    url,
    async ({ request }) => {
      const data = await request.json();

      if (!data) {
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
   * 활동 장소 수정 API
   */
  http.patch<{ locationId: string }, string, {}>(
    url + '/:locationId',
    async ({ request, params }) => {
      const data = await request.json();

      if (!data) {
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
   * 활동 장소 삭제 API
   */
  http.delete<{ locationId: string }>(
    url + '/:locationId',
    async ({ params }) => {
      if (params.locationId === '0') {
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
