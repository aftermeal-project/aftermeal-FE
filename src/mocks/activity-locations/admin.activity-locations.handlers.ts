import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../../constants';
import { ActivityLocationListResponseDto } from '../../types';
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
   * 활동 장소 수정 API
   */
  http.put<{ locationId: string }, ActivityLocationListResponseDto, {}>(
    url + '/:locationId',
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
];
