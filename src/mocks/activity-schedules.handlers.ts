import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../constants';
import {
  ActivityScheduleListResponseDto,
  ActivityScheduleListResponseDtoType,
  ActivityScheduleStatusUpdateDtoStatus,
} from '../types';
import { faker } from '@faker-js/faker';

function getRandomtype() {
  const statuses = Object.values(ActivityScheduleListResponseDtoType);
  const randomIndex = faker.number.int({ min: 0, max: statuses.length - 1 });
  return statuses[randomIndex];
}

function getRandomStatus() {
  const statuses = Object.values(ActivityScheduleStatusUpdateDtoStatus);
  const randomIndex = faker.number.int({ min: 0, max: statuses.length - 1 });
  return statuses[randomIndex];
}

function createRandomActivitySchedules(): ActivityScheduleListResponseDto {
  return {
    activityScheduleId: faker.number.int({ min: 1, max: 1000000 }),
    name: faker.person.fullName(),
    currentParticipants: faker.number.int({ min: 0, max: 1 }),
    maxParticipants: faker.number.int({ min: 2, max: 20 }),
    status: getRandomStatus(),
    type: getRandomtype(),
    scheduledDate: String(faker.date.future()),
  };
}

export const activitySchedulesHandlers = [
  // 활동 일정 리스트 조회
  http.get<{}, {}, ActivityScheduleListResponseDto[]>(
    BASE_URL + '/activity-schedules',
    async () => {
      const data = Array.from({ length: 5 }, () =>
        createRandomActivitySchedules(),
      );

      console.log('asdass');

      return HttpResponse.json(data);
    },
  ),
];
