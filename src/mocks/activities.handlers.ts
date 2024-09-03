import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../constants';
import { ActivityResponseDto } from '../types';
import { createRandomActivity } from './utils/activities.utils';

export const activitiesHandlers = [
  /**
   * 활동 목록 조회 API
   */

  http.get<{}, {}, ActivityResponseDto[]>(
    BASE_URL + '/activities',
    async () => {
      const data = Array.from({ length: 5 }, () => createRandomActivity());

      return HttpResponse.json(data);
    },
  ),
];
