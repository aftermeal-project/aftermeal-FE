import { faker } from '@faker-js/faker';

export function getRandomElementFromArray<T>(array: T[]): T {
  const randomIndex = faker.number.int({ min: 0, max: array.length - 1 });
  return array[randomIndex];
}
