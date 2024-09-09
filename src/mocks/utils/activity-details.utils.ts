import { faker } from '@faker-js/faker';
import {
  ActivityResponseDtoType,
  ActivityResponseDtoStatus,
  ActivityDetailResponseDto,
} from '../../types';
import moment from 'moment';
import { getRandomElementFromArray } from './global.utils';

function getParticipants() {
  const participants = {
    id: faker.number.int({ min: 1, max: 1000000 }),
    name: faker.person.fullName(),
  };

  return participants;
}

function formatDate(date: string) {
  return moment(date).format('YYYY-MM-DD');
}

export function createRandomActivityDetails(): ActivityDetailResponseDto {
  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    title: faker.person.fullName(),
    location: faker.location.city(),
    maxParticipants: faker.number.int({ min: 2, max: 20 }),
    status: getRandomElementFromArray(Object.values(ActivityResponseDtoStatus)),
    type: getRandomElementFromArray(Object.values(ActivityResponseDtoType)),
    scheduledDate: formatDate(moment(faker.date.soon()).toISOString()),
    applicationStartDate: String(faker.date.soon()),
    applicationEndDate: String(faker.date.soon()),
    participants: Array.from({ length: 5 }, () => getParticipants()),
  };
}
