import { http, HttpResponse } from 'msw';
import { LoginRequest } from '../types/auth';
import { BASE_URL } from '../constants/url';

export const authHandlers = [
  http.post<LoginRequest>(BASE_URL + '/v1/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequest;
    if (email !== 'test@example.com' || password !== '12345678') {
      return HttpResponse.json(null, {
        status: 404,
      });
    } else {
      return HttpResponse.json({
        accessToken: String(crypto.randomUUID()),
        refreshToken: String(crypto.randomUUID()),
      });
    }
  }),
];
