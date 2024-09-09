import { delay, http, HttpResponse } from 'msw';
import { BASE_URL } from '../../constants';
import { ActivityDetailResponseDto } from '../../types';
import { createRandomActivityDetails } from '../utils/activity-details.utils';

const url = BASE_URL + '/activities';

export const activityDetailsHandler = [
  /**
   * 활동 목록 상세 조회 API
   */
  http.get<{ activityId: string }, {}, ActivityDetailResponseDto>(
    url + '/:activityId',
    async () => {
      const data = createRandomActivityDetails();

      await delay(2000);
      return HttpResponse.json(data);
    },
  ),
];
