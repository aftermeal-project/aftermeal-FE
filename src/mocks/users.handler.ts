import { http, HttpResponse } from 'msw';
import { UserListResponseDto, UserUpdateRequestDto } from '../types';
import { createRandomUser } from './utils/users.utils';
import { BASE_URL } from '../constants';

const url = BASE_URL + '/users';

export const userHandlers = [
  http.post(BASE_URL + '/v1/users', async ({ request }) => {
    try {
      await request.json();

      return HttpResponse.json({ success: true });
    } catch (error) {
      console.error('Error processing request:', error);
      return HttpResponse.json(
        { error: 'Request processing failed' },
        { status: 500 },
      );
    }
  }),

  /**
   * 유저 목록 조회 API
   */
  http.get<{}, {}, UserListResponseDto[]>(url, async () => {
    const data = Array.from({ length: 10 }, () => createRandomUser());
    return HttpResponse.json(data);
  }),

  /**
   * 유저 수정 API
   */
  http.patch<{ userId: string }, UserUpdateRequestDto, {}>(
    url + '/:userId',
    async ({ request, params }) => {
      const data = await request.json();

      if (data.type === 'TEACHER' && data.generationNumber) {
        return HttpResponse.json(null, {
          status: 400,
        });
      }

      return HttpResponse.json(null, {
        status: 201,
      });
    },
  ),

  /**
   * 유저 삭제 API
   */
  http.delete<{ userId: string }>(url + '/:userId', async ({ params }) => {
    if (params.userId === '0') {
      return HttpResponse.json(
        { message: 'Invalid request data' },
        { status: 400 },
      );
    }

    return HttpResponse.json(null, {
      status: 201,
    });
  }),
];
