import { http, HttpResponse } from 'msw';
import { LoginRequest } from '../types/auth';

export const authHandlers = [
  http.post<LoginRequest>('/api/login', async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequest;

    if (email !== 'test@example.com' || password !== '12345678') {
      return HttpResponse.json(null, {
        status: 404,
      });
    } else {
      return HttpResponse.json({
        accessToken: 'dse21rf-24212rf',
        refreshToken: 'ddw222r-ccswff2',
      });
    }
  }),
];
