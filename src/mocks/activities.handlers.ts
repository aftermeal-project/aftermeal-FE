import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../constants';
import {
  ActivityCreatationRequestDto,
  ActivityListResponseDto,
  ActivityUpdateRequestDto,
} from '../types';
import { faker } from '@faker-js/faker';

function createRandomActivity(): ActivityListResponseDto {
  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    name: faker.person.fullName(),
    maxParticipants: faker.number.int({ min: 2, max: 20 }),
    location: faker.location.city(),
  };
}

export const activitiesHandlers = [
  // 활동 리스트 조회
  http.get(BASE_URL + '/activities', async () => {
    const activityList = Array.from({ length: 5 }, () =>
      createRandomActivity(),
    );
    return HttpResponse.json(activityList);
  }),

  // 활동 생성
  http.post<{}, ActivityCreatationRequestDto>(
    BASE_URL + '/activities',
    async ({ request }) => {
      const data = await request.json();

      if (!data.name || data.maxParticipants <= 0 || !data.location) {
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

  // 활동 수정
  http.put<{ activityId: string }, ActivityUpdateRequestDto>(
    BASE_URL + '/activities',
    async ({ request }) => {
      const data = await request.json();

      if (!data.name || data.maxParticipants <= 0 || !data.location) {
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

  // 활동 삭제
  http.delete<{ activityId: string }>(
    BASE_URL + '/activities',
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
