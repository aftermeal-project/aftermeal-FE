import { faker } from '@faker-js/faker';
import { ActivityLocationListResponseDto } from '../../types';

export function createRandomActivityLocation(): ActivityLocationListResponseDto {
  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    name: faker.location.city(),
  };
}
