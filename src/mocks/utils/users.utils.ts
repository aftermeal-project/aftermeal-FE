import { faker } from '@faker-js/faker';
import {
  UserListResponseDto,
  UserListResponseDtoRoles,
  UserListResponseDtoStatus,
  UserListResponseDtoType,
} from '../../types';
import { getRandomElementFromArray } from './global.utils';

function getRandomRoles(): UserListResponseDtoRoles[] {
  const roles = Object.values(UserListResponseDtoRoles);
  const numberOfRoles = faker.number.int({ min: 1, max: roles.length });
  const randomRoles = faker.helpers.arrayElements(roles, numberOfRoles);
  return randomRoles;
}

export function createRandomUser(): UserListResponseDto {
  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    name: faker.person.fullName(),
    email: faker.internet.exampleEmail(),
    roles: getRandomRoles(),
    type: getRandomElementFromArray(Object.values(UserListResponseDtoType)),
    status: getRandomElementFromArray(Object.values(UserListResponseDtoStatus)),
    generationNumber: faker.number.int({ min: 6, max: 8 }),
  };
}
