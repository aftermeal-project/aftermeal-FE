import { faker } from '@faker-js/faker';
import {
  ActivityResponseDtoType,
  ActivityResponseDtoStatus,
  ActivityDetailResponseDto,
} from '../../types';
import { getRandomElementFromArray } from './global.utils';
import moment from 'moment';

const sports = ['축구', '농구', '배드민턴', '배구', '골프', '탁구'];

const getRandomSport = () => {
  return faker.helpers.arrayElement(sports);
};

function getParticipants() {
  const participants = {
    id: faker.number.int({ min: 1, max: 1000000 }),
    displayName: faker.person.firstName(),
  };

  return participants;
}

function getStartAndEndTimes(type: ActivityResponseDtoType) {
  if (type === 'LUNCH') {
    return {
      startTime: '11:30',
      endTime: '12:20',
    };
  } else if (type === 'DINNER') {
    return {
      startTime: '17:30',
      endTime: '18:20',
    };
  }
  return {
    startTime: '09:00',
    endTime: '10:00',
  };
}

function formatDate(date: string) {
  return moment(date).format('YYYY-MM-DD');
}

export function createRandomActivityDetails(): ActivityDetailResponseDto {
  const type = getRandomElementFromArray(
    Object.values(ActivityResponseDtoType),
  );
  const { startTime, endTime } = getStartAndEndTimes(type);
  const now = new Date();

  const startDate = new Date(now);
  const endDate = new Date(now);

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  startDate.setHours(startHour, startMinute, 0);
  endDate.setHours(endHour, endMinute, 0);

  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    title: getRandomSport(),
    location: faker.location.city(),
    maxParticipants: faker.number.int({ min: 2, max: 20 }),
    status: getRandomElementFromArray(Object.values(ActivityResponseDtoStatus)),
    type: type,
    scheduledDate: formatDate(moment(faker.date.soon()).toISOString()),
    applicationStartDate: String(startDate),
    applicationEndDate: String(endDate),
    participants: Array.from({ length: 5 }, () => getParticipants()),
  };
}
