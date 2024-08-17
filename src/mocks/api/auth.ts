import { LoginRequest } from '../../types/auth';

export async function mockLoginAPI({ email, password }: LoginRequest) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log('Error: ' + errorData);
  }

  return response.json();
}
