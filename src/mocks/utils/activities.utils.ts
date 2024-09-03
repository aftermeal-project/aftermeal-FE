import { faker } from '@faker-js/faker';
import {
  ActivityResponseDtoType,
  ActivityResponseDtoStatus,
  ActivityResponseDto,
} from '../../types';
import moment from 'moment';

function formatDate(date: string) {
  return moment(date).format('YYYY-MM-DD');
}

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

export function createRandomActivity(): ActivityResponseDto {
  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    title: faker.person.fullName(),
    maxParticipants: faker.number.int({ min: 2, max: 20 }),
    currentParticipants: faker.number.int({ min: 0, max: 1 }),
    location: faker.location.city(),
    status: getRandomStatus(),
    type: getRandomtype(),
    scheduledDate: formatDate(moment(faker.date.soon()).toISOString()),
    applicationStartDate: String(faker.date.soon()),
    applicationEndDate: String(faker.date.soon()),
  };
}
