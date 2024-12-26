import { faker } from '@faker-js/faker';
import {
  ActivityListResponseDtoType,
  ActivityListResponseDto,
} from '../../types';
import moment from 'moment';
import { getRandomElementFromArray } from './global.utils';
import { formatDate } from '../../utils';

const sports = ['축구', '농구', '배드민턴', '배구', '골프', '탁구'];

const getRandomSport = () => {
  return faker.helpers.arrayElement(sports);
};

function getStartAndEndTimes(type: ActivityListResponseDtoType) {
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

export function createRandomActivity(): ActivityListResponseDto {
  const type = getRandomElementFromArray(
    Object.values(ActivityListResponseDtoType),
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
    maxParticipants: faker.number.int({ min: 2, max: 20 }),
    currentParticipants: faker.number.int({ min: 0, max: 1 }),
    location: faker.location.city(),
    type: getRandomElementFromArray(Object.values(ActivityListResponseDtoType)),
    scheduledDate: formatDate(moment(faker.date.soon()).toISOString()),
    applicationStartAt: String(startDate),
    applicationEndAt: String(endDate),
  };
}
