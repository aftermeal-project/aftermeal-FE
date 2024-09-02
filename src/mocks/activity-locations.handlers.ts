import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../constants';
import { ActivityLocationListResponseDto } from '../types';
import { createRandomActivityLocation } from './utils/activity-locations.utils';

export const activityLocationsHandlers = [
  http.get<{}, {}, ActivityLocationListResponseDto[]>(
    BASE_URL + '/admin/activity-locations',
    async () => {
      const data = Array.from({ length: 5 }, () =>
        createRandomActivityLocation(),
      );

      return HttpResponse.json(data);
    },
  ),
];
