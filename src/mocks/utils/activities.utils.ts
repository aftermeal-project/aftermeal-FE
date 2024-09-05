import { faker } from '@faker-js/faker';
import {
  ActivityResponseDtoType,
  ActivityResponseDtoStatus,
  ActivityResponseDto,
} from '../../types';
import moment from 'moment';
import { getRandomElementFromArray } from './global.utils';

function formatDate(date: string) {
  return moment(date).format('YYYY-MM-DD');
}

export function createRandomActivity(): ActivityResponseDto {
  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    title: faker.person.fullName(),
    maxParticipants: faker.number.int({ min: 2, max: 20 }),
    currentParticipants: faker.number.int({ min: 0, max: 1 }),
    location: faker.location.city(),
    status: getRandomElementFromArray(Object.values(ActivityResponseDtoStatus)),
    type: getRandomElementFromArray(Object.values(ActivityResponseDtoType)),
    scheduledDate: formatDate(moment(faker.date.soon()).toISOString()),
    applicationStartDate: String(faker.date.soon()),
    applicationEndDate: String(faker.date.soon()),
  };
}
