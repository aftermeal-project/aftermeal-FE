import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../constants/url';

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
];
