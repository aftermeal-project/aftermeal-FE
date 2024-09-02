import { faker } from '@faker-js/faker';
import {
  ActivityResponseDtoType,
  ActivityResponseDtoStatus,
  ActivityResponseDto,
} from '../../types';
import moment from 'moment';

function formatDate(type: string, date: Date) {
  let format = '';

  if (type === 'date') {
    format = moment(date).format('YYYY-MM-DD');
  }

  if (type === 'time') {
    format = moment(date).format('hh:mm');
  }

  return format;
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
    scheduledDate: formatDate('date', faker.date.soon()),
    applicationStartDate: formatDate('time', faker.date.soon()),
    applicationEndDate: formatDate('time', faker.date.soon()),
  };
}
