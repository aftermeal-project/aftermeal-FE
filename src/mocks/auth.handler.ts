import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../constants';
import {
  ErrorResponseData,
  LoginRequestDto,
  LoginResponseDtoUser,
  LoginResponseModel,
} from '../types';
import { faker } from '@faker-js/faker';

function createRandomUser(): LoginResponseDtoUser {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    roles: ['USER', 'ADMIN'],
  };
}

export const authHandlers = [
  http.post<{}, LoginRequestDto, LoginResponseModel | ErrorResponseData>(
    BASE_URL + '/auth/login',
    async ({ request }) => {
      const data = await request.json();

      if (data.email !== 'test@example.com' || data.password !== '12345678') {
        return HttpResponse.json(
          {
            statusCode: 404,
            message: 'Invalid credentials',
          },
          {
            status: 404,
          },
        );
      } else {
        return HttpResponse.json({
          success: true,
          data: {
            tokenType: 'jwt',
            accessToken: 'test',
            refreshToken: 'test',
            expiredIn: 3600,
            user: createRandomUser(),
          },
        });
      }
    },
  ),
];
