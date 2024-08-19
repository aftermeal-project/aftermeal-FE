import { setupWorker } from 'msw/browser';
import { authHandlers } from './auth.handler';
import { userHandlers } from './user.handler';

export const worker = setupWorker(...authHandlers, ...userHandlers);
