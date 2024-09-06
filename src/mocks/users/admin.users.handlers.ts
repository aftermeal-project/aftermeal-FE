import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../../constants';
import { UserListResponseDto } from '../../types';
import { createRandomUser } from '../utils/users.utils';

const url = BASE_URL + '/admin/users';

export const adminUsersHandlers = [
  /**
   * 유저 목록 조회 API
   */
  http.get<{}, {}, UserListResponseDto[]>(url, async () => {
    const data = Array.from({ length: 10 }, () => createRandomUser());
    return HttpResponse.json(data);
  }),
];
