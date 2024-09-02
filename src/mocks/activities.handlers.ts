import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../constants';
import {
  ActivityCreationRequestDto,
  ActivityResponseDto,
  ActivityResponseDtoStatus,
  ActivityResponseDtoType,
  ActivityUpdateRequestDto,
} from '../types';
import { faker } from '@faker-js/faker';

function getRandomtype() {
  const statuses = Object.values(ActivityResponseDtoType);
  const randomIndex = faker.number.int({ min: 0, max: statuses.length - 1 });
  return statuses[randomIndex];
}

function getRandomStatus() {
  const statuses = Object.values(ActivityResponseDtoStatus);
  const randomIndex = faker.number.int({ min: 0, max: statuses.length - 1 });
  return statuses[randomIndex];
}

function createRandomActivity(): ActivityResponseDto {
  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    title: faker.person.fullName(),
    maxParticipants: faker.number.int({ min: 2, max: 20 }),
    currentParticipants: faker.number.int({ min: 0, max: 1 }),
    location: faker.location.city(),
    status: getRandomStatus(),
    type: getRandomtype(),
    scheduledDate: String(faker.date.soon()),
    applicationStartDate: String(faker.date.soon()),
    applicationEndDate: String(faker.date.soon()),
  };
}

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

  /**
   * 활동 생성 API
   */

  http.post<{}, ActivityCreationRequestDto>(
    BASE_URL + '/activities',
    async ({ request }) => {
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
    },
  ),

  /**
   * 활동 수정 API
   */
  http.put<{ activityId: string }, ActivityUpdateRequestDto>(
    BASE_URL + '/activities',
    async ({ request }) => {
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
    },
  ),

  /**
   * 활동 삭제 API
   */
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
